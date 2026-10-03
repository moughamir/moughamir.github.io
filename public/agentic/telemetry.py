#!/usr/bin/env python3
"""Generate portfolio telemetry from the live machine. Every number is measured."""
import json, os, sqlite3, subprocess, collections, datetime, pathlib

H = pathlib.Path.home()
OUT = pathlib.Path(__file__).with_name("telemetry.json")


def sh(cmd, default=None):
    """Run a hardcoded shell command.

    shell=True is deliberate and safe HERE: every cmd passed to this function is
    a literal written in this file (with ~ expanded by the shell). No caller,
    no telemetry value, and nothing read from disk or the network is ever
    interpolated into a command string — the only variable-derived paths are
    passed as sqlite3 parameters, not shell words. There is no injection surface.
    """
    try:
        return subprocess.run(cmd, shell=True, capture_output=True, text=True,
                              timeout=20).stdout.strip()
    except Exception:
        return default


def db(path, query, default=0):
    try:
        con = sqlite3.connect(f"file:{H}/.hermes/{path}?mode=ro", uri=True, timeout=5)
        return con.execute(query).fetchone()[0]
    except Exception:
        return default


t = {}

# --- agent fleet -------------------------------------------------------------
t["sessions"] = db("state.db", "select count(*) from sessions;")
t["messages"] = db("state.db", "select count(*) from messages;")
t["skills"] = int(sh("find ~/.hermes/skills -maxdepth 3 -name SKILL.md 2>/dev/null | wc -l") or 0)
t["agent_skills"] = len(os.listdir(H / ".agents/skills")) if (H / ".agents/skills").is_dir() else 0
t["profiles"] = len([p for p in (H / ".hermes/profiles").iterdir() if p.is_dir()]) if (H / ".hermes/profiles").is_dir() else 0
try:
    t["cron_jobs"] = len(json.load(open(H / ".hermes/cron/jobs.json"))["jobs"])
except Exception:
    t["cron_jobs"] = 0
t["kanban_tasks"] = db("kanban.db", "select count(*) from tasks;")

# --- A2A traffic -------------------------------------------------------------
peers, dirs = collections.Counter(), collections.Counter()
try:
    for line in open(H / ".hermes/a2a_audit.jsonl"):
        if not line.strip().startswith("{"):
            continue
        r = json.loads(line)
        peers[r.get("peer", "?")] += 1
        dirs[r.get("direction", "?")] += 1
except Exception:
    pass
t["a2a_total"] = sum(peers.values())
t["a2a_inbound"] = dirs.get("inbound", 0)
t["a2a_outbound"] = dirs.get("outbound", 0)
t["a2a_peers"] = dict(peers)
conv = H / ".hermes/a2a_conversations"
t["a2a_conversations"] = len(list(conv.glob("*.jsonl"))) if conv.is_dir() else 0

# --- OS layer ----------------------------------------------------------------
os_repo = H / "Work/os"
if (os_repo / ".git").is_dir():
    t["os_commits"] = int(sh("git -C ~/Work/os rev-list --count HEAD") or 0)
    t["os_test_lines"] = len(open(os_repo / "shell/test.sh").read().splitlines()) if (os_repo / "shell/test.sh").exists() else 0
    t["os_skills"] = len(os.listdir(os_repo / "skills")) - (1 if (os_repo / "skills/INVENTORY.md").exists() else 0)
    t["os_agents"] = len(list((os_repo / "agents").glob("*.md"))) if (os_repo / "agents").is_dir() else 0
    reg = os_repo / "mcp/registry.yaml"
    if reg.exists():
        try:
            import yaml
            d = yaml.safe_load(open(reg)) or {}
            t["mcp_servers"] = len(d.get("servers") or [])
            t["mcp_drifted"] = (d.get("count") or {}).get("duplicated_across_trees", 0)
        except Exception:
            t["mcp_servers"] = 0
            t["mcp_drifted"] = 0
    ver = sh("cd ~/Work/os && ./bin/os-verify 2>&1 | tail -1") or ""
    t["os_verify_line"] = ver
    m = __import__("re").search(r"(\d+)\s+ok,\s*(\d+)\s+FAIL", ver)
    t["os_verify_ok"] = int(m.group(1)) if m else None
    t["os_verify_fail"] = int(m.group(2)) if m else None

# --- github ------------------------------------------------------------------
try:
    repos = json.loads(sh("gh repo list --limit 100 --json name,visibility,description,updatedAt"))
    t["repos_total"] = len(repos)
    t["repos_public"] = sum(1 for r in repos if r.get("visibility") == "PUBLIC")
except Exception:
    t["repos_total"] = 0
    t["repos_public"] = 0

t["generated"] = datetime.datetime.now().astimezone().isoformat(timespec="seconds")
OUT.write_text(json.dumps(t, indent=2))
print(json.dumps(t, indent=2))
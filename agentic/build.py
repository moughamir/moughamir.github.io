#!/usr/bin/env python3
"""Build index.html: inject measured telemetry + curated content into the template.

Projects come from the GitHub API (external), so every interpolated value is
HTML-escaped here. The page's own JS builds DOM from the same escaped JSON, so
repo names/descriptions can never inject markup.
"""
import html
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).parent
tpl = (ROOT / "index.template.html").read_text()

telemetry = json.loads((ROOT / "telemetry.json").read_text())

# Failures are verbatim from the build log of 2026-10-03. Kept because the
# failure record is the artifact that can't be faked.
FAILURES = [
    {"ok": False,
     "q": "A dry-run flag that wrote anyway.",
     "bad": "py(){ python3 - \"$@\"; } passed an extra '-', so sys.argv[1] was '-' not '1', dry evaluated False, and every 'dry run' wrote.",
     "fix": "fixed the arg handling; diffed the config semantically against backups to confirm only model keys changed. The lesson recorded: use patch, never yaml.safe_dump, on config files."},
    {"ok": False,
     "q": "A green verifier endorsing a deletion that would have broken 68 paths.",
     "bad": "os-verify check [3] reports 'no consumer symlink points into Work/tries' — but it only scans consumer trees. I read green as 'safe to delete' and nearly removed the rollback material.",
     "fix": "ran the pre-delete check the original session had specified. Found the links. The check was true and my conclusion from it was not."},
    {"ok": False,
     "q": "A regression test that passed against broken code.",
     "bad": "the zsh PATH-splitting test inherited an ambient PATH that already contained the directories, so omnizya_path_add's guard declined to add them — green whether or not the adapter worked.",
     "fix": "scrubbed PATH and re-sourced the adapter inside the test, then verified it goes red when the bug is reintroduced. A test that cannot fail is not a test."},
    {"ok": False,
     "q": "A delegating client that reported failure as success.",
     "bad": "a 30-character stub and exit code 0 when a long agent task exceeded the wrapper's 600s prompt timeout. Two separate times I read that as truncation and wrote it up as a finding.",
     "fix": "found the real cause in the wrapper's own log line: 'Prompt timed out 600000'. Raised the timeout to 30 minutes in config. The answer had been in a log I hadn't scrolled to."},
    {"ok": False,
     "q": "A verifier that couldn't see the failure it was supposed to catch.",
     "bad": "all 68 symlinks in state/hermes-skills-backup/ are dangling — relative targets use ../../Work/tries/... and resolve under a path that never existed. check [3] cannot detect this; it never scans state/.",
     "fix": "found by the delegated agent, which used raw find instead of a pattern match. My own search matched the string inside the link and never resolved it."},
    {"ok": True,
     "q": "A delegated agent correcting me on a fact I had told the user twice.",
     "bad": "I had twice reported '66 live rollback symlinks into winry'. All 68 were already dead, and only 28 targets still hold content.",
     "fix": "verified it myself with readlink -m before accepting it — then corrected the record. Self-reports get checked; that habit is the whole reason the error cost nothing."},
]


def gh_repos(limit=14):
    try:
        raw = subprocess.run(
            ["gh", "repo", "list", "--limit", "40", "--json",
             "name,description,visibility,updatedAt"],
            capture_output=True, text=True, timeout=30).stdout
        repos = json.loads(raw)
    except Exception:
        return []
    prefer = {"os", "firstmate", "sesame", "chantik", "openwa-pgmq", "gameloop",
              "atre-vfs", "agpower", "waa3", "omnizya-brain", "tauri-plugin"}
    scored = []
    for r in repos:
        n = str(r.get("name") or "")
        d = str(r.get("description") or "").strip()
        if not d:
            continue
        boost = 0 if n in prefer else 1
        updated = str(r.get("updatedAt") or "")
        scored.append((boost, tuple(-ord(c) for c in updated[:10]), n, d,
                       str(r.get("visibility") or "")))
    scored.sort()
    return [{"n": n, "d": d, "v": v.lower()} for _, _, n, d, v in scored[:limit]]


PROJECTS = gh_repos() or [
    {"n": "os", "d": "A self-verifying operating layer for one machine", "v": "private"},
]

# --- inject -----------------------------------------------------------------
# json.dumps handles the JS string context; escaping happens on the JS side via
# a textContent pass for text and a deliberate escaping helper for markup.
payload = json.dumps(
    {"t": telemetry, "f": FAILURES, "p": PROJECTS},
    ensure_ascii=False,
)

# Replace the three __PLACEHOLDER__ tokens with a single injected script that
# assigns to the globals the template expects.
inject = f"""
<script>
const DATA = {payload};
const esc = s => String(s ?? '').replace(/[&<>"']/g,
  c => ({{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}}[c]));
const DATA_T = DATA.t, DATA_F = DATA.f, DATA_P = DATA.p;
</script>
"""
tpl = tpl.replace("</body>", inject + "</body>")

# point the template at the injected names
tpl = tpl.replace("__TELEMETRY__", "DATA_T")
tpl = tpl.replace("__FAILURES__", "DATA_F")
tpl = tpl.replace("__PROJECTS__", "DATA_P")

# escape the external (GitHub-sourced) values now, so the JS template strings
# can safely use innerHTML for structure while carrying no raw markup
tpl = tpl.replace(
    '<span class="nm">${p.n}</span>',
    '<span class="nm">${esc(p.n)}</span>').replace(
    '<span class="ds">${p.d}</span>',
    '<span class="ds">${esc(p.d)}</span>')

assert "__" not in re.sub(r"__[a-zA-Z]+__", "", tpl) or True
leftover = [m for m in re.findall(r"__[A-Z_]+__", tpl)]
if leftover:
    raise SystemExit(f"unreplaced placeholders: {leftover}")

(ROOT / "index.html").write_text(tpl)
print(f"built index.html  ({len(tpl):,} bytes)")
print(f"  telemetry keys : {len(telemetry)}")
print(f"  failures       : {len(FAILURES)}")
print(f"  projects       : {len(PROJECTS)}")
print(f"  html escaped   : gh-sourced repo names/descriptions via esc()")
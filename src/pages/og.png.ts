import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0f0f"/>
      <stop offset="100%" style="stop-color:#121212"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ff6719"/>
      <stop offset="100%" style="stop-color:#cc5200"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="30%" r="60%">
      <stop offset="0%" style="stop-color:#ff6719;stop-opacity:0.08"/>
      <stop offset="100%" style="stop-color:#ff6719;stop-opacity:0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" rx="24"/>

  <!-- Glow -->
  <rect width="1200" height="630" fill="url(#glow)" rx="24"/>

  <!-- Subtle grid -->
  <g opacity="0.025">
    ${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="630" stroke="white" stroke-width="1"/>`).join('')}
    ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="1200" y2="${i * 60}" stroke="white" stroke-width="1"/>`).join('')}
  </g>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="6" height="630" fill="url(#accent)"/>

  <!-- Terminal icon top-right decorative -->
  <g transform="translate(980, 100)">
    <rect x="0" y="0" width="160" height="100" rx="10" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="1"/>
    <rect x="8" y="8" width="144" height="84" rx="6" fill="#0a0a0a"/>
    <circle cx="24" cy="22" r="4" fill="#ff5f56"/>
    <circle cx="38" cy="22" r="4" fill="#ffbd2e"/>
    <circle cx="52" cy="22" r="4" fill="#27c93f"/>
    <text x="20" y="52" font-family="ui-monospace, monospace" font-size="13" fill="#ff6719" font-weight="600">moughamir@dev</text>
    <text x="20" y="72" font-family="ui-monospace, monospace" font-size="13" fill="#525252">~ $  <tspan fill="#ff6719">build --ship</tspan></text>
  </g>

  <!-- Decorative orbs -->
  <circle cx="1050" cy="380" r="160" fill="#ff6719" opacity="0.04"/>
  <circle cx="960" cy="480" r="100" fill="#ff6719" opacity="0.03"/>

  <!-- Name -->
  <text x="80" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="700" fill="#ffffff" letter-spacing="-0.03em">Mohamed Moughamir</text>

  <!-- Title -->
  <text x="80" y="270" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="500" fill="#8a8a8a">Senior Software Engineer</text>

  <!-- Tagline -->
  <text x="80" y="325" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="400" fill="#666666">Full-stack · React, TypeScript, Node.js, Bun, AI workflows</text>

  <!-- Stats row -->
  <g>
    <text x="80" y="390" font-family="ui-monospace, monospace" font-size="16" fill="#525252">10+ years</text>
    <text x="200" y="390" font-family="ui-monospace, monospace" font-size="16" fill="#525252">250+ repos</text>
    <text x="320" y="390" font-family="ui-monospace, monospace" font-size="16" fill="#525252">3 languages</text>
  </g>

  <!-- Available badge -->
  <g transform="translate(80, 430)">
    <rect x="0" y="0" width="160" height="40" rx="999" fill="#ff6719" opacity="0.12"/>
    <rect x="0" y="0" width="160" height="40" rx="999" fill="none" stroke="#ff6719" stroke-width="1.5"/>
    <circle cx="30" cy="20" r="5" fill="#ff6719"/>
    <text x="46" y="25" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#ff6719">Open to work</text>
  </g>

  <!-- Tech tags -->
  <g transform="translate(80, 500)">
    <rect x="0" y="0" width="110" height="32" rx="999" fill="#1f1f1f" stroke="#2a2a2a" stroke-width="1"/>
    <text x="16" y="22" font-family="ui-monospace, monospace" font-size="14" fill="#737373">React</text>

    <rect x="120" y="0" width="120" height="32" rx="999" fill="#1f1f1f" stroke="#2a2a2a" stroke-width="1"/>
    <text x="132" y="22" font-family="ui-monospace, monospace" font-size="14" fill="#737373">TypeScript</text>

    <rect x="250" y="0" width="90" height="32" rx="999" fill="#1f1f1f" stroke="#2a2a2a" stroke-width="1"/>
    <text x="265" y="22" font-family="ui-monospace, monospace" font-size="14" fill="#737373">Node.js</text>

    <rect x="350" y="0" width="70" height="32" rx="999" fill="#1f1f1f" stroke="#2a2a2a" stroke-width="1"/>
    <text x="360" y="22" font-family="ui-monospace, monospace" font-size="14" fill="#737373">Bun</text>

    <rect x="430" y="0" width="130" height="32" rx="999" fill="#1f1f1f" stroke="#2a2a2a" stroke-width="1"/>
    <text x="442" y="22" font-family="ui-monospace, monospace" font-size="14" fill="#737373">AI Agents</text>
  </g>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=604800",
    },
  });
};
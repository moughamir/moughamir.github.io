import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@900&amp;family=Space+Grotesk:wght@500;700&amp;display=swap');
    </style>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#09090b"/>

  <!-- Left blue bar -->
  <rect x="0" y="0" width="20" height="630" fill="#2563eb"/>

  <!-- Subtle grid (high contrast) -->
  <g opacity="0.1">
    ${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="630" stroke="#27272a" stroke-width="1"/>`).join('')}
    ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="1200" y2="${i * 60}" stroke="#27272a" stroke-width="1"/>`).join('')}
  </g>

  <!-- Title / Name -->
  <text x="80" y="180" font-family="Archivo, sans-serif" font-size="96" font-weight="900" fill="#fafafa" text-transform="uppercase" letter-spacing="-0.05em">M. MOUGHAMIR</text>

  <!-- Role -->
  <text x="80" y="260" font-family="Archivo, sans-serif" font-size="40" font-weight="800" fill="#2563eb" text-transform="uppercase">SENIOR SOFTWARE ENGINEER</text>

  <!-- Tagline -->
  <text x="80" y="320" font-family="Space Grotesk, sans-serif" font-size="28" font-weight="500" fill="#a1a1aa">BEYOND THE CHATBOX: AI &amp; ARCHITECTURE</text>

  <!-- Stats Grid (Brutalist) -->
  <g transform="translate(80, 400)">
    <rect x="0" y="0" width="200" height="80" fill="none" stroke="#27272a" stroke-width="2"/>
    <text x="100" y="45" font-family="Archivo, sans-serif" font-size="32" font-weight="900" fill="#fafafa" text-anchor="middle">10+</text>
    <text x="100" y="70" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700" fill="#71717a" text-anchor="middle" text-transform="uppercase">YEARS EXP</text>

    <rect x="220" y="0" width="200" height="80" fill="none" stroke="#27272a" stroke-width="2"/>
    <text x="320" y="45" font-family="Archivo, sans-serif" font-size="32" font-weight="900" fill="#fafafa" text-anchor="middle">250+</text>
    <text x="320" y="70" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700" fill="#71717a" text-anchor="middle" text-transform="uppercase">REPOS</text>

    <rect x="440" y="0" width="200" height="80" fill="#2563eb"/>
    <text x="540" y="45" font-family="Archivo, sans-serif" font-size="32" font-weight="900" fill="#fafafa" text-anchor="middle">HIRE ME</text>
    <text x="540" y="70" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700" fill="#fafafa" text-anchor="middle" text-transform="uppercase">EMEA REMOTE</text>
  </g>

  <!-- Tech Strip (Bottom) -->
  <g transform="translate(80, 530)">
    <text font-family="ui-monospace, monospace" font-size="20" font-weight="700" fill="#71717a">
      <tspan fill="#fafafa">TYPESCRIPT</tspan> // <tspan fill="#fafafa">BUN</tspan> // <tspan fill="#fafafa">REACT</tspan> // <tspan fill="#fafafa">AI AGENTS</tspan> // <tspan fill="#fafafa">MCP</tspan>
    </text>
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
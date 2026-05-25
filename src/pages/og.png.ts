import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0f0f"/>
      <stop offset="100%" style="stop-color:#1a1a1a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0072f5"/>
      <stop offset="100%" style="stop-color:#0a72ef"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" rx="24"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.03">
    ${Array.from({ length: 20 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="630" stroke="white" stroke-width="1"/>`).join('')}
    ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="1200" y2="${i * 60}" stroke="white" stroke-width="1"/>`).join('')}
  </g>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="6" height="630" fill="url(#accent)"/>

  <!-- Name -->
  <text x="80" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="700" fill="white" letter-spacing="-0.03em">Mohamed Moughamir</text>

  <!-- Title -->
  <text x="80" y="270" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="400" fill="#8a8a8a">Senior Software Engineer</text>

  <!-- Tagline -->
  <text x="80" y="330" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="300" fill="#666666">Building things that ship and scale</text>

  <!-- Location -->
  <text x="80" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="400" fill="#737373">Morocco 🇲🇦 · Remote-ready</text>

  <!-- Available badge -->
  <rect x="80" y="440" width="160" height="44" rx="999" fill="#16a34a" opacity="0.15"/>
  <rect x="80" y="440" width="160" height="44" rx="999" fill="none" stroke="#16a34a" stroke-width="1.5"/>
  <circle cx="105" cy="462" r="6" fill="#16a34a"/>
  <text x="120" y="468" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#16a34a">Available</text>

  <!-- Tech tags -->
  <g opacity="0.6">
    <rect x="80" y="510" width="100" height="32" rx="999" fill="#262626"/>
    <text x="95" y="532" font-family="ui-monospace, monospace" font-size="14" fill="#737373">React</text>

    <rect x="190" y="510" width="100" height="32" rx="999" fill="#262626"/>
    <text x="205" y="532" font-family="ui-monospace, monospace" font-size="14" fill="#737373">TypeScript</text>

    <rect x="300" y="510" width="70" height="32" rx="999" fill="#262626"/>
    <text x="312" y="532" font-family="ui-monospace, monospace" font-size="14" fill="#737373">Bun</text>

    <rect x="380" y="510" width="90" height="32" rx="999" fill="#262626"/>
    <text x="393" y="532" font-family="ui-monospace, monospace" font-size="14" fill="#737373">Node.js</text>
  </g>

  <!-- Right side decorative elements -->
  <circle cx="1050" cy="200" r="120" fill="#0072f5" opacity="0.05"/>
  <circle cx="1100" cy="400" r="80" fill="#0072f5" opacity="0.03"/>

  <!-- Terminal icon decorative -->
  <rect x="950" y="140" width="180" height="120" rx="12" fill="#1f1f1f" stroke="#333333" stroke-width="1"/>
  <rect x="960" y="150" width="160" height="100" rx="6" fill="#0a0a0a"/>
  <circle cx="970" cy="162" r="4" fill="#ff5f56"/>
  <circle cx="982" cy="162" r="4" fill="#ffbd2e"/>
  <circle cx="994" cy="162" r="4" fill="#27c93f"/>
  <text x="970" y="190" font-family="ui-monospace, monospace" font-size="14" fill="#4a4a4a">const dev = true;</text>
  <text x="970" y="215" font-family="ui-monospace, monospace" font-size="14" fill="#4a4a4a">// shipping 🚀</text>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=604800",
    },
  });
};
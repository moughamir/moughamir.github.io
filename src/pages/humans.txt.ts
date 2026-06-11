import type { APIRoute } from 'astro'

const humansTxt = `
/* TEAM */
Chef/Developer: Moughamir
Site: https://moughamir.github.io
Location: Morocco

/* THANKS */
Astro: https://astro.build
Bun: https://bun.sh
Tailwind CSS: https://tailwindcss.com
Playwright: https://playwright.dev

/* SITE */
Last update: 2026/06/11
Standards: HTML5, CSS3
Software: Astro, Bun, Tailwind CSS
`;

export const GET: APIRoute = () => {
  return new Response(humansTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};

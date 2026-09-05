import type { APIRoute } from 'astro';

/**
 * robots.txt generated at build time so the sitemap URL follows the deploy
 * target (staging under a base path vs. production at https://yeservants.org/).
 * The static public/robots.txt it replaces had the staging URL hardcoded.
 */
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  const sitemap = new URL(`${base}sitemap-index.xml`, site).href;
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

import { blogPosts } from '../data/blogPosts';

export async function GET() {
  const siteUrl = 'https://jitinnair.com';
  const siteTitle = 'Jitin Nair — AI Systems Architect';
  const siteDescription = 'Technical articles on AI enablement, multi-agent orchestration, MCP, Bayesian inference, and agentic AI systems by Jitin Nair.';

  const items = blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/insights/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/insights/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>jitin@glitchzero.com (Jitin Nair)</author>
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>${siteTitle}</title>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <managingEditor>jitin@glitchzero.com (Jitin Nair)</managingEditor>
    <webMaster>jitin@glitchzero.com (Jitin Nair)</webMaster>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

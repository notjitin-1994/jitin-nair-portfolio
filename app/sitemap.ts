import { MetadataRoute } from 'next';
import { blogPosts } from './data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jitinnair.com';

  const posts = blogPosts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const projects = [
    'predator',
    'smarslate',
    'reality',
    'revos',
    'commune',
    'localmind',
  ].map((id) => ({
    url: `${baseUrl}/projects/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const routes = [
    { route: '', priority: 1.0, frequency: 'weekly' as const },
    { route: '/insights', priority: 0.9, frequency: 'weekly' as const },
  ].map(({ route, priority, frequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: frequency,
    priority,
  }));

  return [...routes, ...posts, ...projects];
}

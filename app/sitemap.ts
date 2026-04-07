import { MetadataRoute } from 'next';
import { blogPosts } from './data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jitinnair.com';

  const posts = blogPosts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projects = [
    'predator',
    'smartslate',
    'reality',
    'revos',
    'agency',
    'commune',
  ].map((id) => ({
    url: `${baseUrl}/projects/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const routes = ['', '/projects', '/insights'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes, ...posts, ...projects];
}

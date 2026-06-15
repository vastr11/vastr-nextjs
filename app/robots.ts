import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cart', '/account'],
    },
    sitemap: 'https://vastr.pk/sitemap.xml',
  };
}

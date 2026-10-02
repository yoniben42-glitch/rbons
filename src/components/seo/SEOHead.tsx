import React, { useEffect } from 'react';
import { businessInfo } from '../../data/business';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description = 'RBONSU Photography creates editorial wedding, cultural, portrait, and fine-art imagery from Alexandria, Virginia, serving Washington, D.C., Maryland, Northern Virginia, and destinations worldwide.',
  canonicalPath = '/',
  ogType = 'website',
  ogImage = '/og.jpg',
}) => {
  const fullTitle = title
    ? `${title} — ${businessInfo.brandName}`
    : `${businessInfo.brandName} | ${businessInfo.tagline}`;

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = fullTitle;

    // Helper to set or update meta tag
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + canonicalPath);

    // Schema.org Structured Data (PhotographyBusiness / ProfessionalService)
    const schemaId = 'rbonsu-structured-data';
    let script = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'PhotographyBusiness',
      name: businessInfo.brandName,
      description: description,
      url: window.location.origin,
      telephone: businessInfo.phone,
      email: businessInfo.inquiriesEmail,
      sameAs: [businessInfo.instagram.url, businessInfo.pinterest.url],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Alexandria',
        addressRegion: 'VA',
        addressCountry: 'US',
      },
    };

    script.text = JSON.stringify(structuredData);
  }, [fullTitle, description, canonicalPath, ogType, ogImage]);

  return null;
};

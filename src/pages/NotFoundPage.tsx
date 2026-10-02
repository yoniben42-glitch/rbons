import React from 'react';
import { Link } from '@/lib/router-compat';
import { SEOHead } from '../components/seo/SEOHead';
import { Container } from '../components/common/Container';
import { Display, Body, Metadata } from '../components/common/Typography';
import { PageTransition } from '../components/motion/PageTransition';

export const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <SEOHead title="404 — Frame Not Found" />

      <div className="py-24 sm:py-36 text-center">
        <Container size="md">
          <Metadata className="block mb-4">404 Error</Metadata>
          <Display className="mb-6">Frame Not Found</Display>
          <Body className="max-w-md mx-auto mb-10 text-[#5E5247]">
            The requested perspective or story does not exist in this catalog.
          </Body>
          <Link
            to="/"
            className="inline-block font-sans text-xs uppercase tracking-[0.14em] font-medium py-3.5 px-8 bg-[#191817] text-[#FAF8F5]"
          >
            Return To Foundation Overview
          </Link>
        </Container>
      </div>
    </PageTransition>
  );
};

import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { PageTransition } from '../components/motion/PageTransition';
import { HeroShowcase } from '../components/home/HeroShowcase';
import { SelectedStories } from '../components/home/SelectedStories';
import { CuratedGallery } from '../components/home/CuratedGallery';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PhilosophySection } from '../components/home/PhilosophySection';
import { ServicesSection } from '../components/home/ServicesSection';
import { FinalCTASection } from '../components/home/FinalCTASection';

export const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <SEOHead
        title="RBONSU PHOTOGRAPHY | Timeless Weddings, Luxury Portraits & Editorial Fine Art"
        description="Editorial wedding and cultural storytelling by RBONSU Photography, based in Alexandria, Virginia and serving Washington, D.C., Maryland, Northern Virginia, and destinations worldwide."
      />

      <div className="flex flex-col w-full">
        {/* Full-Bleed Dynamic Hero Carousel */}
        <HeroShowcase />

        {/* Selected Visual Stories */}
        <SelectedStories />

        {/* Interactive Filtered Portfolio Matrix */}
        <CuratedGallery />

        {/* Verified Client Social Proof */}
        <TestimonialsSection />

        {/* Studio Philosophy & Light Narrative */}
        <PhilosophySection />

        {/* Services & Investment Collections */}
        <ServicesSection />

        {/* Final Luxury Call to Action */}
        <FinalCTASection />
      </div>
    </PageTransition>
  );
};

import React from 'react';
import { ArrowUpRight, Quote } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import { Container } from '../common/Container';
import { FadeIn } from '../motion/FadeIn';
import { publishedTestimonials } from '../../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F4F1EB] border-y border-[#ECE7DD]" aria-labelledby="client-words-heading">
      <Container size="cinema">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <span className="block font-sans text-[10px] uppercase tracking-[0.24em] text-[#8C7A6B] mb-4">
                Client Words
              </span>
              <h2 id="client-words-heading" className="font-serif text-4xl sm:text-5xl text-[#191817] font-normal tracking-tight leading-[1.05]">
                The experience matters as much as the photographs.
              </h2>
              <p className="mt-5 font-sans text-sm leading-relaxed text-[#5E5247] max-w-md">
                Verified client reviews will be published here exactly as approved by the studio.
                Until then, the section stays intentionally editorial rather than using invented social proof.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center mt-7 font-sans text-xs uppercase tracking-[0.16em] font-medium text-[#191817] underline underline-offset-4 hover:no-underline"
              >
                Begin Your Commission
                <ArrowUpRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </div>

            <div className="lg:col-span-8">
              {publishedTestimonials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {publishedTestimonials.map((testimonial) => (
                    <figure key={`${testimonial.clientName}-${testimonial.eventType}`} className="bg-[#FAF8F5] border border-[#ECE7DD] p-7 sm:p-8">
                      <Quote className="w-6 h-6 text-[#8C7A6B] mb-7" aria-hidden="true" />
                      <blockquote className="font-serif text-2xl leading-relaxed text-[#191817]">
                        “{testimonial.quote}”
                      </blockquote>
                      <figcaption className="mt-7 pt-5 border-t border-[#ECE7DD] font-sans text-[11px] uppercase tracking-[0.16em] text-[#8C7A6B]">
                        <span className="block text-[#191817] font-medium">{testimonial.clientName}</span>
                        <span className="block mt-1">{testimonial.eventType}{testimonial.location ? ` · ${testimonial.location}` : ''}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="bg-[#FAF8F5] border border-[#ECE7DD] p-8 sm:p-10 min-h-[250px] flex flex-col justify-between">
                  <div>
                    <Quote className="w-6 h-6 text-[#8C7A6B] mb-7" aria-hidden="true" />
                    <p className="font-serif text-2xl sm:text-3xl leading-relaxed text-[#191817] max-w-2xl">
                      No verified client reviews are published yet. This space is reserved for authentic feedback approved by the studio.
                    </p>
                  </div>
                  <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-[#8C7A6B]">
                    Verified client feedback · Publishing system ready
                  </p>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
};

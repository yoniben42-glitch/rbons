/**
 * Verified client testimonials only.
 *
 * Do not invent or paraphrase reviews. Add a published testimonial here only
 * after the studio has verified the client's wording and approved attribution.
 */
export interface Testimonial {
  quote: string;
  clientName: string;
  eventType: string;
  location?: string;
}

export const publishedTestimonials: Testimonial[] = [];

/**
 * Real customer reviews to feature on the /reviews page.
 *
 * Leave this array empty and the reviews page shows links out to the live
 * Google and AutoTrader pages instead.
 *
 * To feature a review, copy a genuine one from Google or AutoTrader:
 *   { quote: 'First class service from start to finish.',
 *     author: 'A. Customer', source: 'Google' }
 *
 * Only ever add real reviews. Never invent them.
 */
export interface Testimonial {
  quote: string;
  author: string;
  source: 'Google' | 'AutoTrader';
}

export const testimonials: Testimonial[] = [];

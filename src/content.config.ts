import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The "cars" collection. Each vehicle is one JSON file in src/content/cars/.
 * The filename (without .json) becomes the URL slug, e.g.
 *   src/content/cars/audi-rs6-gt.json  ->  /stock/audi-rs6-gt
 *
 * To add a car: copy an existing file, rename it, edit the values.
 * To remove a car: delete the file.
 */
const cars = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cars' }),
  schema: z.object({
    // Identity
    make: z.string(),
    model: z.string(),
    variant: z.string(),

    // Registration / age, shown as-is e.g. "2025 (75 plate)"
    year: z.string(),

    // Pricing
    price: z.number(),
    priceQualifier: z.enum(['none', 'inc-vat', 'plus-vat']).default('none'),

    // Specs
    bodyType: z.enum(['Estate', 'Hatchback', 'Saloon', 'SUV', 'Van']),
    fuel: z.enum(['Petrol', 'Diesel', 'Petrol Hybrid', 'Electric']),
    transmission: z.enum(['Automatic', 'Manual']),
    mileage: z.number(),
    engineSize: z.string().optional(),
    ulez: z.boolean().default(false),

    // Availability:
    //  available  -> physically in stock now
    //  sourcing   -> we can source this for you
    //  reserved   -> deposit taken
    //  sold       -> gone (kept for SEO / "recently sold" if wanted)
    status: z.enum(['available', 'sourcing', 'reserved', 'sold']).default('available'),

    // Optional short highlight shown on the card, e.g. "Just arrived"
    badge: z.string().optional(),

    // Show in the homepage "Featured" row
    featured: z.boolean().default(false),

    // Longer sales copy for the detail page
    description: z.string().optional(),

    // Image paths relative to /public, e.g. "/cars/audi-rs6-gt/1.jpg".
    // Leave empty and a designed placeholder is shown automatically.
    images: z.array(z.string()).default([]),
  }),
});

export const collections = { cars };

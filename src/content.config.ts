import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const missionaries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/missionaries' }),
  schema: z.object({
    name: z.string(),
    url: z.string(),
    location: z.string(),
    picture: z.string(),
    description: z.string(),
    bio: z.string(),
    contact: z.object({
      email: z.string().optional(),
      email2: z.string().optional(),
      phone: z.string().optional(),
      phone2: z.string().optional(),
      address: z.array(z.string()).optional(),
      address2: z.array(z.string()).optional(),
      link: z.string().optional(),
      link2: z.string().optional(),
      none: z.boolean().optional(),
    }).nullish(),
    gallery: z.array(z.string()).optional(),
    sendingChurch: z.string().optional(),
    ministryStarted: z.string().optional(),
    duration: z.string().optional(),
    /* V3 Gospel Workers profile fields — optional, non-breaking */
    role: z.string().optional(),
    region: z.string().optional(),
    yearsOfService: z.string().optional(),
    quote: z.string().optional(),
  }),
});

export const collections = { missionaries };

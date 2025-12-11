import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files from dated subdirectories in `src/content/blog/`
	// Pattern: YYYY-MM-DD-slug/index.md
	loader: glob({ base: './src/content/blog', pattern: '**/index.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			// Optional slug override - if not provided, will be derived from folder name
			slug: z.string().optional(),
		}),
});

export const collections = { blog };

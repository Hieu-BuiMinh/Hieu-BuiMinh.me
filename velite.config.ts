//import rehypeShiki from '@shikijs/rehype'
import rehypeAutoLinkHeading from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { defineCollection, defineConfig, s } from 'velite'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const computedFields: any = <T extends { slug: string }>(data: T) => {
	return { ...data, slugAsParams: data.slug.split('/').slice(1).join('/') }
	// blog/hello-world => ['blog', 'hello-world'] => ['hello-world] => '/hello-world'
}

export type VeliteMetaItem = {
	id?: string
	title: string
	slug: string
	url?: string
	type: 'ROOT' | 'CHILD'
	children?: VeliteMetaItem[]
}
export type VeliteOrder = {
	id: string
	children?: VeliteOrder[]
}
const metaItem: ReturnType<typeof s.lazy> = s.lazy(() =>
	s.object({
		id: s.string().optional(),
		title: s.string(),
		slug: s.string(),
		url: s.string().optional(),
		type: s.enum(['ROOT', 'CHILD']),
		children: s.array(metaItem).optional(),
	})
)
const order: ReturnType<typeof s.lazy> = s.lazy(() =>
	s.object({
		id: s.string(),
		children: s.array(order).optional(),
	})
)

const devBlogPosts = defineCollection({
	name: 'DevBlogPost',
	pattern: 'dev-blog/**/*.mdx',
	schema: s
		.object({
			id: s.string(),
			slug: s.path(),
			title: s.string().max(999),
			date: s.isodate(),
			lastUpdated: s.isodate().optional(),
			cover: s.string().optional(),
			video: s.file().optional(),
			metadata: s.metadata().optional(),
			description: s.string().max(999).optional(),
			published: s.boolean().default(true),
			hashTags: s
				.object({
					category: s.string(),
					tags: s.array(s.string()),
				})
				.optional(),
			body: s.mdx(),
			author: s.object({
				avatar: s.string(),
				name: s.string(),
				github: s.string(),
			}),
			toc: s.toc({ tight: true, ordered: true, maxDepth: 6 }),
			//slugAsParams <=> needed transform
		})
		.transform(computedFields),
})

const pages = defineCollection({
	name: 'PagePost',
	pattern: 'pages/**/*.mdx',
	schema: s
		.object({
			id: s.string(),
			slug: s.path(),
			title: s.string().max(999),
			date: s.isodate(),
			lastUpdated: s.isodate().optional(),
			cover: s.string().optional(),
			video: s.file().optional(),
			metadata: s.metadata().optional(),
			description: s.string().max(999).optional(),
			published: s.boolean().default(true),
			tags: s.array(s.string()).optional(),
			body: s.mdx(),
			author: s.object({
				avatar: s.string(),
				name: s.string(),
				github: s.string(),
			}),
			//slugAsParams <=> needed transform
		})
		.transform(computedFields),
})

const projects = defineCollection({
	name: 'ProjectPost',
	pattern: 'projects/**/*.mdx',
	schema: s
		.object({
			id: s.string(),
			slug: s.path(),
			title: s.string().max(999),
			date: s.isodate(),
			lastUpdated: s.isodate().optional(),
			cover: s.string().optional(),
			video: s.file().optional(),
			metadata: s.metadata().optional(),
			description: s.string().max(999).optional(),
			published: s.boolean().default(true),
			shown: s.boolean().default(false),
			tags: s.array(s.string()).optional(),
			body: s.mdx(),
			links: s.object({ repoUrl: s.string(), demoUrl: s.string() }).optional(),
			author: s.object({
				avatar: s.string(),
				name: s.string(),
				github: s.string(),
			}),
			toc: s.toc({ tight: true, ordered: true, maxDepth: 6 }),
			//slugAsParams <=> needed transform
		})
		.transform(computedFields),
})

const interests = defineCollection({
	name: 'InterestPost',
	pattern: 'interests/**/*.mdx',
	schema: s
		.object({
			id: s.string(),
			slug: s.path(),
			title: s.string().max(999),
			date: s.isodate(),
			lastUpdated: s.isodate().optional(),
			cover: s.string().optional(),
			video: s.file().optional(),
			metadata: s.metadata().optional(),
			description: s.string().max(999).optional(),
			published: s.boolean().default(true),
			type: s.enum(['ROOT', 'CHILD']),
			hashTags: s
				.object({
					category: s.string(),
					tags: s.array(s.string()),
				})
				.optional(),
			body: s.mdx(),
			author: s.object({
				avatar: s.string(),
				name: s.string(),
				github: s.string(),
			}),
			toc: s.toc({ tight: true, ordered: true, maxDepth: 6 }),
			//slugAsParams <=> needed transform
		})
		.transform(computedFields),
})

const docs = defineCollection({
	name: 'DocPost',
	pattern: 'docs/**/*.mdx',
	schema: s
		.object({
			id: s.string(),
			slug: s.path(),
			title: s.string().max(999),
			date: s.isodate(),
			lastUpdated: s.isodate().optional(),
			cover: s.string().optional(),
			video: s.file().optional(),
			metadata: s.metadata().optional(),
			description: s.string().max(999).optional(),
			published: s.boolean().default(true),
			type: s.enum(['ROOT', 'CHILD']),
			parent: s.string().optional(),
			root: s.string().optional(),
			hashTags: s.object({
				category: s.string(),
				tags: s.array(s.string()),
			}),
			body: s.mdx(),
			author: s.object({
				avatar: s.string(),
				name: s.string(),
				github: s.string(),
			}),
			toc: s.toc({ tight: true, ordered: true, maxDepth: 6 }),
			order: s.array(order).optional(), // only root have order
			//slugAsParams <=> needed transform
		})
		.transform(computedFields),
})

const retros = defineCollection({
	name: 'RetroPost',
	pattern: 'retros/**/*.mdx',
	schema: s
		.object({
			id: s.string(),
			slug: s.path(),
			title: s.string().max(999),
			year: s.number(),
			date: s.isodate(),
			lastUpdated: s.isodate().optional(),
			cover: s.string().optional(),
			video: s.file().optional(),
			metadata: s.metadata().optional(),
			description: s.string().max(999).optional(),
			published: s.boolean().default(true),
			shown: s.boolean().default(false),
			hashTags: s.object({
				category: s.string(),
				tags: s.array(s.string()),
			}),
			body: s.mdx(),
			links: s.object({ repoUrl: s.string(), demoUrl: s.string() }).optional(),
			author: s.object({
				avatar: s.string(),
				name: s.string(),
				github: s.string(),
			}),
			toc: s.toc({ tight: true, ordered: true, maxDepth: 6 }),
			//slugAsParams <=> needed transform
		})
		.transform(computedFields),
})

export default defineConfig({
	root: 'content',
	output: {
		data: '.velite',
		assets: 'public/static',
		base: '/static/',
		name: '[name]-[hash:6].[ext]',
		clean: true,
	},
	collections: { devBlogPosts, pages, projects, interests, docs, retros },
	mdx: {
		rehypePlugins: [
			rehypeSlug,
			// this use for shiki https://shiki.style/guide/dual-themes#light-dark-dual-themes
			// if use shiki, remmeber to uncomment css in code-block.css file
			// @/components/commons/mdx/style/code-block.css
			// [
			// 	rehypeShiki,
			// 	{
			// 		themes: {
			// 			light: 'github-light',
			// 			dark: 'night-owl',
			// 		},
			// 	},
			// ],

			// rehypePrettyCode doc: https://rehype-pretty.pages.dev/#options
			[rehypePrettyCode, { theme: { light: 'github-light', dark: 'night-owl', keepBackground: true } }],
			[rehypeHighlight],
			[
				rehypeAutoLinkHeading,
				{
					behavior: 'wrap',
					properties: {
						className: ['subheading-anchor'],
						ariaLabel: 'Link to section',
					},
				},
			],
		],
		remarkPlugins: [],
	},
})

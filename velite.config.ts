import rehypeAutoLinkHeading from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { defineCollection, defineConfig, s } from 'velite'

export const computedFields = <T extends { slug: string }>(data: T) => {
	return { ...data, slugAsParams: data.slug.split('/').slice(1).join('/') }
	// blog/hello-world => ['blog', 'hello-world'] => ['hello-world] => '/hello-world'
}

const devBlog = defineCollection({
	name: 'DevBlog',
	pattern: 'dev-blog/**/*.mdx',
	schema: s
		.object({
			id: s.string(),
			slug: s.path(),
			title: s.string().max(999),
			date: s.isodate(),
			lastUpdated: s.isodate().optional(),
			cover: s.image().optional(),
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

const pages = defineCollection({
	name: 'PageContent',
	pattern: 'pages/**/*.mdx',
	schema: s
		.object({
			id: s.string(),
			slug: s.path(),
			title: s.string().max(999),
			date: s.isodate(),
			lastUpdated: s.isodate().optional(),
			cover: s.image().optional(),
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

export default defineConfig({
	root: 'content',
	output: {
		data: '.velite',
		assets: 'public/static',
		base: '/static/',
		name: '[name]-[hash:6].[ext]',
		clean: true,
	},
	collections: { devBlog, pages },
	mdx: {
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					them: 'github-dark',
					keepBackground: false,
				},
			],
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

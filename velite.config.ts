import { defineCollection, defineConfig, s } from 'velite'

const computedFields = (data: { slug: string }) => {
	return { ...data, slugAsParams: data.slug.split('/').slice(1).join('/') }
	// blog/hello-world => ['blog', 'hello-world'] => ['hello-world] => '/hello-world'
}

const posts = defineCollection({
	name: 'Post',
	pattern: 'blog/**/*.mdx',
	schema: s
		.object({
			slug: s.path(),
			title: s.string().max(99),
			date: s.isodate(),
			cover: s.image().optional(),
			video: s.file().optional(),
			metadata: s.metadata().optional(),
			description: s.string().max(999).optional(),
			published: s.boolean().default(true),
			body: s.mdx(),
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
	collections: { posts },
	mdx: { rehypePlugins: [], remarkPlugins: [] },
})

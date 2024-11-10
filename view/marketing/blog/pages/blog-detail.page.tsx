import { notFound } from 'next/navigation'

import { posts } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'

interface PostPageProps {
	params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: PostPageProps['params']) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join('/')
	const post = posts.find((post) => post.slugAsParams === slug)

	return post
}

export default async function BlogDetailPageView({ params }: PostPageProps) {
	const post = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

	return (
		<article className="prose dark:prose-invert container mx-auto max-w-3xl py-6">
			<h1 className="mb-2">{post.title}</h1>
			<MDXContent code={post.body} />
		</article>
	)
}

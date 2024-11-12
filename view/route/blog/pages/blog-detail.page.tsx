import { notFound } from 'next/navigation'

import { devBlog } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'

interface PostPageProps {
	params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: PostPageProps['params']) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join('/')
	const post = devBlog.find((post) => post.slugAsParams === slug)

	return post
}

export default async function BlogDetailPageView({ params }: PostPageProps) {
	const post = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

	return (
		<article className="container prose mx-auto max-w-3xl pb-6 dark:prose-invert">
			<MDXContent code={post.body} />
		</article>
	)
}

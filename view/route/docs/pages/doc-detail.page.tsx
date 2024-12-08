import { notFound } from 'next/navigation'

import { docs } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import TableOfContent from '@/components/commons/table-of-content'
import DocPostDetailHeader from '@/view/components/doc-content/doc-post-detail-header'

interface PostPageProps {
	params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: PostPageProps['params']) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join('/')
	const post = docs.find((post) => post.slugAsParams === slug)

	return post
}

async function DocDetailPageView({ params }: PostPageProps) {
	const post = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

	return (
		<div className="relative flex justify-between gap-10 p-3">
			<article className="prose max-w-full dark:prose-invert lg:max-w-[calc(100%-220px)]">
				<div className="not-prose">
					<DocPostDetailHeader post={post} />
				</div>
				<MDXContent code={post.body} />
			</article>

			<aside className="hidden lg:block lg:w-[220px]">
				<div className="sticky top-24">
					<TableOfContent post={post} />
				</div>
			</aside>
		</div>
	)
}

export default DocDetailPageView

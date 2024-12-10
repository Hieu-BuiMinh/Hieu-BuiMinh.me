import Image from 'next/image'
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
			<div className="absolute inset-0 z-[-1] hidden h-[64rem] max-h-screen overflow-hidden bg-doc-header-gradient opacity-30 lg:block">
				<Image
					src="/assets/images/docs/docs-header-decor.svg"
					width={790}
					height={640}
					alt="docs-header-decor"
				/>
			</div>
			<article className="prose max-w-full dark:prose-invert lg:max-w-[calc(100%-220px)]">
				<DocPostDetailHeader post={post} className="not-prose" />
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

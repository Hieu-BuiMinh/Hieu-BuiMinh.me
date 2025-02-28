import { notFound } from 'next/navigation'

import type { RetroPost } from '@/.velite'
import { retros } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import TableOfContent from '@/components/commons/table-of-content'
import CommentSection from '@/view/components/blog-content/comments'
import PostLastUpdated from '@/view/components/blog-content/post-last-updated'
import PostLikeButton from '@/view/components/blog-content/post-like-button'

interface PostPageProps {
	params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: PostPageProps['params']) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join('/')
	const post = retros.find((post: RetroPost) => post.slugAsParams === slug)

	return post
}

export default async function RetrosDetailPageView({ params }: PostPageProps) {
	const post: RetroPost = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

	return (
		<>
			<div className="relative flex justify-between gap-10">
				<article className="prose max-w-full dark:prose-invert lg:max-w-[calc(100%-220px)]">
					<MDXContent code={post.body} />

					{post.lastUpdated && <PostLastUpdated date={post.lastUpdated} />}
				</article>

				<aside className="hidden lg:block lg:w-[220px]">
					<div className="sticky top-16 z-10 flex flex-col gap-4">
						<TableOfContent post={post} />
						<PostLikeButton post={post} />
					</div>
				</aside>

				<div className="fixed bottom-12 right-2 z-20 lg:hidden">
					<div className="flex flex-col items-end gap-2">
						<PostLikeButton post={post} />
						<TableOfContent post={post} />
					</div>
				</div>
			</div>
			{/* User comments */}
			<CommentSection post={post} />
		</>
	)
}

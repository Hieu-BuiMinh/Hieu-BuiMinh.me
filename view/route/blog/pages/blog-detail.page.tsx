import { notFound } from 'next/navigation'

import type { DevBlogPost } from '@/.velite'
import { devBlogPosts } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import TableOfContent from '@/components/commons/table-of-content'
import { formatDate } from '@/lib/utils'
import CommentSection from '@/view/components/blog-content/comments'
import PostLikeButton from '@/view/components/blog-content/post-like-button'

interface PostPageProps {
	params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: PostPageProps['params']) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join('/')
	const post = devBlogPosts.find((post: DevBlogPost) => post.slugAsParams === slug)

	return post
}

export default async function BlogDetailPageView({ params }: PostPageProps) {
	const post = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

	return (
		<>
			<div className="relative flex justify-between gap-10">
				<article className="prose max-w-full dark:prose-invert lg:max-w-[calc(100%-220px)]">
					<MDXContent code={post.body} />

					{post.lastUpdated && (
						<div className="py-10 text-right text-sm">
							Last updated:&nbsp;{formatDate(post.lastUpdated)}
						</div>
					)}

					{/* User comments */}
					<CommentSection post={post} />
				</article>

				<aside className="hidden lg:block lg:w-[220px]">
					<div className="sticky top-24 flex flex-col gap-4">
						<TableOfContent post={post} />

						<PostLikeButton post={post} />
					</div>
				</aside>
			</div>
		</>
	)
}

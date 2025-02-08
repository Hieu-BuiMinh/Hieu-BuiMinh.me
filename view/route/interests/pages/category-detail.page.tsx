import { Rethink_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'

import { interests } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import TableOfContent from '@/components/commons/table-of-content'
import { cn } from '@/lib/utils'
import CommentSection from '@/view/components/blog-content/comments'
import PostLastUpdated from '@/view/components/blog-content/post-last-updated'
import PostLikeButton from '@/view/components/blog-content/post-like-button'

interface ICategoryDetailPageProps {
	params: Promise<{ category: string; slug: string[] }>
}

async function getPostFromParams(params: ICategoryDetailPageProps['params']) {
	const resolvedParams = await params
	const slug = [resolvedParams.category, ...resolvedParams.slug].join('/')
	const post = interests.find((post) => post.slugAsParams === slug)

	return post
}

const rethink_Sans = Rethink_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '700', '800'],
})

export default async function CategoryDetailPage({ params }: ICategoryDetailPageProps) {
	const post = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

	return (
		<>
			<div className="relative flex justify-between gap-10">
				<article
					className={cn(
						'prose max-w-full dark:prose-invert lg:max-w-[calc(100%-220px)]',
						rethink_Sans.className
					)}
				>
					<MDXContent code={post.body} />

					{post.lastUpdated && <PostLastUpdated date={post.lastUpdated} />}
				</article>

				<aside className="hidden lg:block lg:w-[220px]">
					<div className="sticky top-16 flex flex-col gap-4">
						<TableOfContent post={post} />

						<PostLikeButton post={post} />
					</div>
				</aside>
			</div>
			{/* User comments */}
			<CommentSection post={post} />
		</>
	)
}

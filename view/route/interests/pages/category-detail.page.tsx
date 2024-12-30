import { Roboto } from 'next/font/google'
import { notFound } from 'next/navigation'

import { interests } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import TableOfContent from '@/components/commons/table-of-content'
import { cn, formatDate } from '@/lib/utils'
import CommentSection from '@/view/components/blog-content/comments'
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

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
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
					className={cn('prose max-w-full dark:prose-invert lg:max-w-[calc(100%-220px)]', roboto.className)}
				>
					<MDXContent code={post.body} />

					{post.lastUpdated && (
						<div className="text-right text-sm">Last updated:&nbsp;{formatDate(post.lastUpdated)}</div>
					)}
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

import { Rethink_Sans } from 'next/font/google'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { docs } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import { DesktopTableOfContent, MobileTableOfContent } from '@/components/commons/table-of-content'
import { cn } from '@/lib/utils'
import CommentSection from '@/view/components/blog-content/comments'
import PostLastUpdated from '@/view/components/blog-content/post-last-updated'
import PostLikeButton from '@/view/components/blog-content/post-like-button'
import DocPostDetailHeader from '@/view/components/doc-content/doc-post-detail-header'
import FooterNavigator from '@/view/components/doc-content/footer-navigator'

interface PostPageProps {
	slug: string
}

const rethink_Sans = Rethink_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '700', '800'],
})

async function DocDetailPageView({ slug }: PostPageProps) {
	const post = docs.find((post) => post.slugAsParams === slug)

	if (!post || !post.published) {
		notFound()
	}

	return (
		<div className="relative flex justify-center gap-0 p-3 max-sm:overflow-auto lg:justify-between lg:gap-5">
			<div className="absolute inset-0 z-[-1] hidden h-[64rem] max-h-screen overflow-hidden bg-doc-header-gradient opacity-100 lg:block">
				<Image
					src="/assets/images/docs/docs-header-decor.svg"
					width={790}
					height={640}
					alt="docs-header-decor"
				/>
			</div>
			<article
				className={cn(
					'prose w-full text-muted-foreground dark:prose-invert lg:max-w-[calc(100%-220px)]',
					rethink_Sans.className
				)}
			>
				<DocPostDetailHeader post={post} className="not-prose" />
				<MDXContent code={post.body} />

				{post.lastUpdated && <PostLastUpdated date={post.lastUpdated} />}

				<FooterNavigator post={post} />

				{/* User comments */}
				<div className="mt-20">
					<CommentSection post={post} />
				</div>
			</article>

			<aside className="hidden lg:block lg:w-[220px]">
				<div className="sticky top-16 z-10 flex flex-col gap-4">
					<DesktopTableOfContent post={post} />
					<PostLikeButton post={post} />
				</div>
			</aside>

			<div className="fixed bottom-12 right-2 z-20 lg:hidden">
				<div className="flex flex-col items-end gap-2">
					<PostLikeButton post={post} />
					<MobileTableOfContent post={post} />
				</div>
			</div>
		</div>
	)
}

export default DocDetailPageView

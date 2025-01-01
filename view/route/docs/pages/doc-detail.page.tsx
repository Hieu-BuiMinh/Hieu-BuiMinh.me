import { Roboto } from 'next/font/google'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { docs } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import TableOfContent from '@/components/commons/table-of-content'
import { cn, formatDate } from '@/lib/utils'
import CommentSection from '@/view/components/blog-content/comments'
import PostLikeButton from '@/view/components/blog-content/post-like-button'
import DocPostDetailHeader from '@/view/components/doc-content/doc-post-detail-header'
import FooterNavigator from '@/view/components/doc-content/footer-navigator'

interface PostPageProps {
	slug: string
}

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
})

async function DocDetailPageView({ slug }: PostPageProps) {
	const post = docs.find((post) => post.slugAsParams === slug)

	if (!post || !post.published) {
		notFound()
	}

	return (
		<div className="relative flex justify-between gap-5 p-3 max-sm:overflow-auto">
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
					'prose max-w-full text-muted-foreground dark:prose-invert lg:max-w-[calc(100%-220px)]',
					roboto.className
				)}
			>
				<DocPostDetailHeader post={post} className="not-prose" />
				<MDXContent code={post.body} />

				{post.lastUpdated && (
					<div className="text-right text-sm">Last updated:&nbsp;{formatDate(post.lastUpdated)}</div>
				)}

				<FooterNavigator post={post} />

				{/* User comments */}
				<div className="mt-20">
					<CommentSection post={post} />
				</div>
			</article>

			<aside className="hidden lg:block lg:w-[220px]">
				<div className="sticky top-16 flex flex-col gap-4">
					<TableOfContent post={post} />

					<PostLikeButton className="mt-4" post={post} />
				</div>
			</aside>
		</div>
	)
}

export default DocDetailPageView

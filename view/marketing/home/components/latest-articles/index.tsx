import Image from 'next/image'
import Link from 'next/link'

import type { DevBlogPost } from '@/.velite'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PostCard } from '@/view/components/blog-content/post-card'

type TLatestArticles = {
	devBlogPosts: DevBlogPost[]
}

function LatestArticles({ devBlogPosts }: TLatestArticles) {
	return (
		<div className="relative my-32">
			<div className="font-title text-center text-3xl font-bold sm:text-4xl">Latest Articles</div>
			<div className="mt-12 grid gap-4 md:grid-cols-2">
				{devBlogPosts
					.filter((post) => post.published)
					.map((post) => (
						<PostCard key={post.slug} post={post} />
					))}
			</div>
			<div className="my-8 flex items-center justify-center">
				<Link
					href="/dev-blog"
					className={cn(
						buttonVariants({
							variant: 'outline',
						})
					)}
				>
					See all post
				</Link>
			</div>

			<Image
				alt=""
				src="/assets/images/background/landing-page/post-section.svg"
				className="absolute -top-20 -z-10 w-full opacity-40 md:w-[740px]"
				width={1200}
				height={1200}
			/>
		</div>
	)
}

export default LatestArticles

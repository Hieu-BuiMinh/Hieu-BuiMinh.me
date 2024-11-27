import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import pluralize from 'pluralize'

import type { DevBlogPost } from '@/.velite'
import BlurImage from '@/components/commons/image/blur-image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { formatDate } from '@/lib/utils'

type PostCardsProps = {
	posts: DevBlogPost[]
	root: string
}

const PostCards = ({ posts, root }: PostCardsProps) => {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<PostCard key={post.slug} post={post} root={root} />
			))}
		</div>
	)
}

interface PostCardProps {
	post: DevBlogPost
	root: string
}

const PostCard = ({ post, root }: PostCardProps) => {
	const { title, description, date, slugAsParams } = post

	const formattedDate = formatDate(date)

	const viewsQuery = 100 // save in api here

	const likesQuery = 100 // save in api here

	return (
		<Link
			href={`/${root}/${slugAsParams}`}
			// className="group rounded-md px-2 py-4 shadow-feature-card dark:shadow-feature-card-dark"
			className="group rounded-md border p-2 dark:border-none dark:p-0"
		>
			<BlurImage
				src={post.cover || ''}
				className="h-[220px] rounded-md object-cover"
				width={1200}
				height={220}
				imageClassName="transition-transform group-hover:scale-105 object-cover"
				alt={title}
			/>
			<div className="flex items-center justify-between gap-2 px-2 pt-4 text-xs text-zinc-500">
				{formattedDate}
			</div>

			<div className="flex flex-col px-2 py-4">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<h3 className="font-title text-md line-clamp-1 text-left font-bold">{title}</h3>
						</TooltipTrigger>
						<TooltipContent className="max-w-[250px] bg-secondary text-foreground shadow-md">
							<p>{title}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<p className="mt-2 line-clamp-2 text-left text-muted-foreground">{description}</p>
						</TooltipTrigger>
						<TooltipContent className="max-w-[250px] bg-secondary text-foreground shadow-md">
							<p>{description}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className="flex items-center justify-between gap-2 px-2 text-xs text-zinc-500">
				<div className="flex gap-2">
					<div>{pluralize('like', likesQuery, true)}</div>
					<div>&middot;</div>
					<div>{pluralize('view', viewsQuery, true)}</div>
				</div>
				<span className="flex items-center justify-center gap-1">
					Read more <ArrowRight size={10} />
				</span>
			</div>
		</Link>
	)
}
export default PostCards

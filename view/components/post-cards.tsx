import Link from 'next/link'
import pluralize from 'pluralize'

import type { DevBlog } from '@/.velite'
import { BlurImage } from '@/components/commons/image/blur-image'
import { formatDate } from '@/lib/utils'

type PostCardsProps = {
	posts: DevBlog[]
	root: string
}

const PostCards = ({ posts, root }: PostCardsProps) => {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			{posts.map((post) => (
				<PostCard key={post.slug} post={post} root={root} />
			))}
		</div>
	)
}

interface PostCardProps {
	post: DevBlog
	root: string
}

const PostCard = ({ post, root }: PostCardProps) => {
	const { slug, title, description, date, slugAsParams } = post

	const formattedDate = formatDate(date)

	const viewsQuery = 100 // save in api here

	const likesQuery = 100 // save in api here

	return (
		<Link
			href={`/${root}/${slugAsParams}`}
			className="group rounded-md px-2 py-4 shadow-feature-card dark:shadow-feature-card-dark"
		>
			<BlurImage
				src={`/assets/images/${slug}/cover.png`}
				className="h-[220px] rounded-md object-cover"
				width={1200}
				height={630}
				imageClassName="transition-transform group-hover:scale-105"
				alt={title}
			/>
			<div className="flex items-center justify-between gap-2 px-2 pt-4 text-sm text-zinc-500">
				{formattedDate}
				<div className="flex gap-2">
					<div>{pluralize('like', likesQuery, true)}</div>
					<div>&middot;</div>
					<div>{pluralize('view', viewsQuery, true)}</div>
				</div>
			</div>
			<div className="flex flex-col px-2 py-4">
				<h3 className="font-title line-clamp-2 text-2xl font-bold">{title}</h3>
				<p className="mt-2 line-clamp-2 text-muted-foreground">{description}</p>
			</div>
		</Link>
	)
}
export default PostCards

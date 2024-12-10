import Image from 'next/image'

import type { DocPost } from '@/.velite'
import { cn, formatDate } from '@/lib/utils'

interface IDocPostDetailHeaderProps {
	post: DocPost
	className?: string
}

function DocPostDetailHeader({ post, className }: IDocPostDetailHeaderProps) {
	return (
		<div className={cn('relative flex flex-col gap-5 border-b border-dashed pb-5', className)}>
			<h1 className="text-2xl font-bold md:text-3xl">{post.title}</h1>

			<div className="my-4 grid grid-cols-2 text-sm max-md:gap-4 md:grid-cols-4">
				<div className="flex flex-col gap-2 p-2 md:mx-auto">
					<span className="text-muted-foreground">Written by</span>
					<div className="flex items-center gap-2">
						<Image alt="auth-avt" width={20} height={20} src={post.author.avatar} />
						{post.author.name}
					</div>
				</div>
				<div className="flex flex-col gap-2 p-2 md:mx-auto">
					<span className="text-muted-foreground">Published on</span>
					<span>{formatDate(post.date)}</span>
				</div>
				<div className="flex flex-col gap-2 p-2 md:mx-auto">
					<span className="text-muted-foreground">Views</span>
					<span>{100}</span>
				</div>
				<div className="flex flex-col gap-2 p-2 md:mx-auto">
					<span className="text-muted-foreground">Comments</span>
					<span>{100}</span>
				</div>
			</div>

			<h2 className="text-muted-foreground">{post.description}</h2>
		</div>
	)
}

export default DocPostDetailHeader

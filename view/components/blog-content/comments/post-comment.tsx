'use client'

import { useQuery } from 'convex/react'
import { format } from 'date-fns'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { api } from '@/convex/_generated/api'
import type { DocPost } from '@/convex/schemas/post.schema'
import Markdown from '@/view/components/blog-content/comments/comment-markdown'

function PostComment({ comment }: { comment: DocPost['comments'][number] }) {
	const users = useQuery(api.services.users.getAllUsers)
	const user = users?.find((user) => user.userId === comment.userId)

	const formattedDate = format(comment.creationTime, 'dd MMM yyyy | HH:mm')
	console.log(comment.content)

	return (
		<div className="p-2 sm:px-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-xs">
					<Avatar className="size-8">
						<AvatarImage className="m-0" src={user?.avatar} />
						<AvatarFallback>{user?.name || '?'}</AvatarFallback>
					</Avatar>
					<span className="text-sm font-semibold">{user?.name}</span>
					<span className="text-muted-foreground">on {formattedDate}</span>
				</div>
				control
			</div>
			<Markdown>{comment.content || ''}</Markdown>
		</div>
	)
}

export default PostComment

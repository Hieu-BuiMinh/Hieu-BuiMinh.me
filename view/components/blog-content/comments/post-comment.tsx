'use client'

import { useMutation, useQuery } from 'convex/react'
import { format } from 'date-fns'
import { Ellipsis, Trash } from 'lucide-react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import type { DocPost } from '@/convex/schemas/post.schema'
import { useStoreUserEffect } from '@/hooks/useStoreUserEffect'
import { useCommentSectionContext } from '@/view/components/blog-content/comments'
import Markdown from '@/view/components/blog-content/comments/comment-markdown'

function PostComment({ comment }: { comment: DocPost['comments'][number] }) {
	const { post } = useCommentSectionContext()
	const users = useQuery(api.services.users.getAllUsers)
	const user = users?.find((user) => user.userId === comment.userId)
	const { isAuthenticated } = useStoreUserEffect()
	const postBySlug = useQuery(api.services.post.getPostBySlug, { slug: post?.slugAsParams })
	const deleteComment = useMutation(api.services.post.deletePostComment)

	const formattedDate = format(comment.creationTime, 'dd MMM yyyy | HH:mm')

	const handleDeleteComment = (id?: Id<'post'>) => {
		if (!id) return
		const promise = deleteComment({ postId: id, commentId: comment.commentId })
		toast.promise(promise, {
			loading: 'Deleting comment...',
			success: 'Comment deleted',
			error: 'Failed to delete comment',
		})
	}

	return (
		<div className="p-2 sm:px-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-xs">
					<Avatar className="size-8">
						<AvatarImage className="m-0" src={user?.avatar} />
						<AvatarFallback>{user?.name || '?'}</AvatarFallback>
					</Avatar>

					<div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
						<span className="text-sm font-semibold">{user?.name}</span>
						<span className="text-muted-foreground">on {formattedDate}</span>
					</div>
				</div>

				{isAuthenticated && user?.userId === comment.userId ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="size-5" size="icon" variant="ghost">
								<Ellipsis size={15} />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className="w-40" align="center" alignOffset={8} forceMount>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => {
									handleDeleteComment(postBySlug?._id)
								}}
							>
								<Trash className="mr-2 size-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<span />
				)}
			</div>
			<Markdown>{comment.content || ''}</Markdown>
		</div>
	)
}

export default PostComment

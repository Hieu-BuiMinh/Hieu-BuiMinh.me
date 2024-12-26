'use client'

import { useUser } from '@clerk/clerk-react'
import { useMutation, useQuery } from 'convex/react'
import { format } from 'date-fns'
import { CircleX, Ellipsis, MessagesSquare, ThumbsDown, ThumbsUp, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import type { DocPost } from '@/convex/schemas/post.schema'
import useConfirmModal from '@/hooks/use-confirm-modal'
import { useStoreUserEffect } from '@/hooks/use-store-user-effect'
import { useCommentSectionContext } from '@/view/components/blog-content/comments'
import Markdown from '@/view/components/blog-content/comments/comment-markdown'
import CommentReply from '@/view/components/blog-content/comments/comment-reply'

function PostComment({
	comment,
}: {
	comment: DocPost['comments'][number] & { children?: DocPost['comments'][number][] }
}) {
	const [isReplying, setIsReplying] = useState(false)

	const { post } = useCommentSectionContext()
	const { setModalOptions } = useConfirmModal()

	const { user: currentUser } = useUser()
	const users = useQuery(api.services.users.getAllUsers)
	const commentUser = users?.find((user) => user.userId === comment.userId)

	const { isAuthenticated } = useStoreUserEffect()

	const postBySlug = useQuery(api.services.post.getPostBySlug, { slug: post?.slugAsParams })
	const deleteComment = useMutation(api.services.post.deletePostComment)

	const formattedDate = format(comment.creationTime, 'dd MMM yyyy | HH:mm aa')

	const handleDeleteComment = (id?: Id<'post'>) => {
		if (!id) return
		const promise = deleteComment({ postId: id, commentId: comment.commentId })
		toast.promise(promise, {
			loading: 'Deleting comment...',
			success: 'Comment deleted',
			error: 'Failed to delete comment',
		})
	}

	const toggleAnswerSection = () => {
		setIsReplying((prev) => !prev)
	}

	const handleOpenConfirmModal = (id?: Id<'post'>) => {
		setModalOptions({
			title: 'Delete your comment',
			description: 'Are you sure you want to delete this comment? This action cannot be undone.',
			buttons: { cancel: 'Cancel', confirm: 'Confirm' },
			actions: { onConfirm: () => handleDeleteComment(id) },
		})
	}

	return (
		<div className="flex flex-col pt-4 first:p-0">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-xs">
					<Avatar className="size-8">
						<AvatarImage className="m-0" src={commentUser?.avatar} />
						<AvatarFallback>{commentUser?.name || '?'}</AvatarFallback>
					</Avatar>

					<div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
						<span className="text-sm font-semibold">{commentUser?.name}</span>
						<span className="text-muted-foreground">on {formattedDate}</span>
					</div>
				</div>

				{isAuthenticated && currentUser?.id === comment.userId ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="size-5" size="icon" variant="ghost">
								<Ellipsis size={15} />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent className="w-32" align="center" alignOffset={8} forceMount>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => {
									handleOpenConfirmModal(postBySlug?._id)
								}}
							>
								<Trash className="mr-2 size-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : null}
			</div>
			<Markdown>{comment.content || ''}</Markdown>

			<div className="flex items-center gap-3 text-muted-foreground">
				<Button className="flex h-8 gap-2 transition-colors hover:text-foreground" variant="outline">
					<ThumbsUp size={16} />
					<span>0</span>
				</Button>
				<Button className="flex h-8 gap-2 transition-colors hover:text-foreground" variant="outline">
					<ThumbsDown />
					<span>0</span>
				</Button>
				{isAuthenticated ? (
					<Button
						onClick={toggleAnswerSection}
						className="flex h-8 gap-2 transition-colors hover:text-foreground"
						variant={isReplying ? 'destructive' : 'outline'}
					>
						{isReplying ? <CircleX /> : <MessagesSquare />}
						<span>{isReplying ? 'Cancel' : 'Reply'}</span>
					</Button>
				) : (
					<p className="text-sm text-muted-foreground">You need to log in to reply to this comment.</p>
				)}
			</div>

			{isReplying && isAuthenticated && <CommentReply comment={comment} />}

			{comment.children && comment.children.length > 0 && (
				<div className="ml-[14px] border-l border-dashed pl-[26px] pt-4">
					{comment.children.map((child) => (
						<PostComment comment={child} key={child.commentId} />
					))}
				</div>
			)}
		</div>
	)
}

export default PostComment

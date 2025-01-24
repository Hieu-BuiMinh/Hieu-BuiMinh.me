'use client'

import { useUser } from '@clerk/clerk-react'
import NumberFlow from '@number-flow/react'
import { useMutation, useQuery } from 'convex/react'
import { format } from 'date-fns'
import { CircleX, Ellipsis, MessagesSquare, ThumbsDown, ThumbsUp, Trash } from 'lucide-react'
import { Roboto } from 'next/font/google'
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
import { cn } from '@/lib/utils'
import { useCommentSectionContext } from '@/view/components/blog-content/comments'
import Markdown from '@/view/components/blog-content/comments/comment-markdown'
import CommentReply from '@/view/components/blog-content/comments/comment-reply'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
})

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

	const { isAuthenticated, isAuthor } = useStoreUserEffect()

	const postBySlug = useQuery(api.services.post.getPostBySlug, { slug: post?.slugAsParams })
	const deleteComment = useMutation(api.services.post.deletePostComment)
	const interactComment = useMutation(api.services.post.interactComment)

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
	const handleInteractComment = ({ id, type }: { id?: Id<'post'>; type: 'LIKE' | 'DISLIKE' }) => {
		if (!isAuthenticated) {
			toast.warning('You need to ligin to interact 🚧')
			return
		}
		if (!id) return
		interactComment({ postId: id, commentId: comment.commentId, type: type })
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
						<AvatarImage
							className={cn(
								'm-0 rounded-full',
								comment.userId === currentUser?.id &&
									'border border-dashed border-foreground/70 p-0.5 dark:bg-foreground/30'
							)}
							src={commentUser?.avatar}
						/>
						<AvatarFallback>{commentUser?.name || '?'}</AvatarFallback>
					</Avatar>

					<div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-3">
						<span className="text-sm font-semibold">{commentUser?.name}</span>
						<span className="text-muted-foreground">on {formattedDate}</span>
					</div>
				</div>

				{(isAuthenticated && currentUser?.id === comment.userId) || isAuthor ? (
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

			<div
				className={cn(
					'relative ml-[14px] border-l border-dashed py-3 pl-[26px] text-sm text-foreground',
					comment.userId === currentUser?.id && 'border-foreground/70',
					roboto.className
				)}
			>
				{comment.userId === currentUser?.id && (
					<span className="absolute bottom-0 left-[-2.2px] h-2/5 w-1 bg-gradient-to-t from-background" />
				)}
				<Markdown>{comment.content || ''}</Markdown>
			</div>

			<div className="flex items-center gap-3 text-muted-foreground">
				<Button
					disabled={!isAuthenticated}
					onClick={() => {
						handleInteractComment({ id: postBySlug?._id, type: 'LIKE' })
					}}
					className={cn(
						'flex h-8 gap-2 transition-colors hover:text-foreground',
						comment.likes.includes(currentUser?.id || '') && 'border-foreground text-foreground'
					)}
					variant="outline"
				>
					<ThumbsUp
						className={cn(comment.likes.includes(currentUser?.id || '') && 'dark:fill-foreground/50')}
					/>
					<NumberFlow
						willChange
						value={comment.likes.length || 0}
						format={{ trailingZeroDisplay: 'stripIfInteger' }}
					/>
				</Button>
				<Button
					disabled={!isAuthenticated}
					onClick={() => {
						handleInteractComment({ id: postBySlug?._id, type: 'DISLIKE' })
					}}
					className={cn(
						'flex h-8 gap-2 transition-colors hover:text-foreground',
						comment.disLikes.includes(currentUser?.id || '') && 'border-foreground text-foreground'
					)}
					variant="outline"
				>
					<ThumbsDown
						className={cn(comment.disLikes.includes(currentUser?.id || '') && 'dark:fill-foreground/50')}
					/>
					<NumberFlow
						willChange
						value={comment.disLikes.length || 0}
						format={{ trailingZeroDisplay: 'stripIfInteger' }}
					/>
				</Button>
				{isAuthenticated && (
					<Button
						onClick={toggleAnswerSection}
						className="flex h-8 gap-2 transition-colors hover:text-foreground"
						variant={isReplying ? 'destructive' : 'outline'}
					>
						{isReplying ? <CircleX /> : <MessagesSquare />}
						<span>{isReplying ? 'Cancel' : 'Reply'}</span>
					</Button>
				)}
			</div>

			{!isAuthenticated && (
				<p className="mt-1.5 text-xs italic text-muted-foreground">Log in to interact or reply 🌵</p>
			)}

			{isReplying && isAuthenticated && (
				<div
					className={cn(
						'ml-[14px] border-l border-dashed pl-[26px] pt-3',
						comment.userId === currentUser?.id && 'border-foreground/70'
					)}
				>
					<CommentReply comment={comment} />
				</div>
			)}

			{comment.children && comment.children.length > 0 && (
				<div
					className={cn(
						'relative ml-[14px] border-l border-dashed pl-[26px] pt-2',
						comment.userId === currentUser?.id && 'border-foreground/70'
					)}
				>
					{comment.userId === currentUser?.id && (
						<span className="absolute bottom-0 left-[-2.2px] h-2/5 w-1 bg-gradient-to-t from-background" />
					)}
					{comment.children.map((child) => (
						<PostComment comment={child} key={child.commentId} />
					))}
				</div>
			)}
		</div>
	)
}

export default PostComment

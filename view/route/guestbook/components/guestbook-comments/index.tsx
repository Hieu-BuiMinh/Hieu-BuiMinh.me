'use client'

import './style.css'

import { useUser } from '@clerk/clerk-react'
import { useMutation, useQuery } from 'convex/react'
import { formatDate } from 'date-fns'
import { Ellipsis, Trash } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { range } from '@/utils/range'
// import { useCommentSectionContext } from '@/view/components/blog-content/comments'

function GuestbookComments() {
	// const { post } = useCommentSectionContext()
	const allComments = useQuery(api.services.guestbookComment.getAllComments)
	const deleteComment = useMutation(api.services.guestbookComment.deleteComment)

	const { user } = useUser()

	const handleDeleteComment = (id: Id<'guestbookComment'>) => {
		const promise = deleteComment({ id })
		toast.promise(promise, {
			loading: 'Deleting note...',
			success: 'Comment deleted',
			error: 'Failed to delete note',
		})
	}

	if (allComments === undefined) {
		return (
			<div className="masonry mt-4">
				{range(30).map((_, index) => (
					<div key={index} className="masonry-item">
						<div className="flex items-center space-x-4 rounded-lg border p-4 shadow-sm dark:bg-zinc-900/30">
							<Skeleton className="size-9 shrink-0 rounded-full" />
							<div className="w-full space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-1/2" />
							</div>
						</div>
					</div>
				))}
			</div>
		)
	}

	return (
		<div className="masonry mt-4">
			{allComments.map((comment, index) => (
				<div key={index} className="masonry-item">
					<div className="flex w-full flex-col gap-4 space-x-4 rounded-lg border p-4 shadow-sm dark:bg-zinc-900/30">
						<div className="flex items-center justify-between">
							<div className="flex gap-3">
								<Image
									width={600}
									height={400}
									src={comment.avatar}
									alt="user-avatar"
									className="size-9 shrink-0 rounded-full"
								/>
								<div className="flex flex-col gap-1 text-xs">
									<p>{comment.author}</p>
									<p className="text-muted-foreground">
										{formatDate(new Date(comment.date || ''), 'dd/MM/yyyy HH:mm:ss a')}
									</p>
								</div>
							</div>

							{user && user.id === comment.userId ? (
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
												handleDeleteComment(comment._id)
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

						<p className="!m-0 text-sm">{comment.message}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default GuestbookComments

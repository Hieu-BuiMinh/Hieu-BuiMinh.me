'use client'

import { useUser } from '@clerk/clerk-react'
import NumberFlow from '@number-flow/react'
import confetti from 'canvas-confetti'
import { useMutation, useQuery } from 'convex/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'

import type { DevBlogPost, DocPost, InterestPost } from '@/.velite'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { api } from '@/convex/_generated/api'
import { useStoreUserEffect } from '@/hooks/use-store-user-effect'
import useAnonymousStore from '@/view/stores/anonymous.store'

type PostLikeButtonProps = {
	post: DevBlogPost | DocPost | InterestPost
	className?: string
}

const PostLikeButton = ({ post, className }: PostLikeButtonProps) => {
	const { isAuthenticated } = useStoreUserEffect()
	const { user } = useUser()
	const { likes, addPostLikeBySlug } = useAnonymousStore()

	const [currentUserLikes, setCurrentUserLikes] = useState<number>(0)
	const confettiRef = useRef<HTMLButtonElement>(null)

	const postBySlug = useQuery(api.services.post.getPostBySlug, { slug: post.slugAsParams })
	const likeMutation = useMutation(api.services.post.updatePostLikes)

	const totalLikes = postBySlug?.likes.reduce((acc, like) => acc + like.count, 0) || 0
	const currentPostAnonymousLikes = likes.find((like) => like.postSlug === post.slugAsParams)?.count || 0

	const playConfetti = () => {
		const { clientWidth, clientHeight } = document.documentElement
		const boundingBox = confettiRef.current?.getBoundingClientRect()
		const targetY = boundingBox?.y ?? 0
		const targetX = boundingBox?.x ?? 0
		const targetWidth = boundingBox?.width ?? 0
		const targetCenterX = targetX + targetWidth / 2

		const heartEmoji = confetti.shapeFromText({ text: '❤️', scalar: 2 })
		const partyEmoji = confetti.shapeFromText({ text: '🎉', scalar: 2 })

		confetti({
			zIndex: 999,
			particleCount: 100,
			spread: 100,
			origin: { y: targetY / clientHeight, x: targetCenterX / clientWidth },
			shapes: [heartEmoji, partyEmoji],
		})

		confetti({
			zIndex: 999,
			particleCount: 15,
			spread: 100,
			scalar: 0.8,
			origin: { y: targetY / clientHeight, x: targetCenterX / clientWidth },
			shapes: ['circle'],
		})
	}

	const handleLike = useDebounceCallback(() => {
		setCurrentUserLikes((prev) => Math.min(prev + 1, 3))

		// add anonymous user liked posts slug to localstorage
		if (!isAuthenticated && currentUserLikes < 3) {
			addPostLikeBySlug(post.slugAsParams)
		}

		if (currentUserLikes < 3 && postBySlug) {
			if (currentUserLikes === 2) {
				const promise = likeMutation({ id: postBySlug?._id })
				toast.promise(promise, { success: 'So grateful for your enthusiasm 💖' })
			} else {
				likeMutation({ id: postBySlug?._id })
			}
		}
	}, 1000)

	useEffect(() => {
		const userLikes = isAuthenticated
			? postBySlug?.likes.find((like) => like.userId === user?.id)?.count || 0
			: currentPostAnonymousLikes

		setCurrentUserLikes(userLikes)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, likes])

	if (!postBySlug) {
		return null
	}

	return (
		<div className={className}>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							disabled={!postBySlug}
							ref={confettiRef}
							onClick={() => {
								handleLike()
								playConfetti()
							}}
							variant="outline"
							className={className}
						>
							<div className="relative size-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="absolute size-full"
								>
									<path
										d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
										fill={`rgba(255, 0, 0, ${currentUserLikes / 3})`}
										stroke="rgba(255, 0, 0, 0.8)"
										strokeWidth="2"
									/>
								</svg>
							</div>
							<Separator orientation="vertical" />
							<NumberFlow
								willChange
								value={totalLikes}
								format={{ trailingZeroDisplay: 'stripIfInteger' }}
							/>
							🎉
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Give it a ❤️ and watch the magic!</p>
						<p className="text-center">{currentUserLikes + `/3`}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
}

export default PostLikeButton

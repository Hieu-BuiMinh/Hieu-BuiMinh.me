'use client'

import { useUser } from '@clerk/clerk-react'
import confetti from 'canvas-confetti'
import { useMutation, useQuery } from 'convex/react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'

import type { DevBlogPost, DocPost, InterestPost } from '@/.velite'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { api } from '@/convex/_generated/api'
import useAnonymousStore from '@/view/stores/anonymous.store'

function PostLikeButton({ post }: { post: DevBlogPost | DocPost | InterestPost }) {
	const { user } = useUser()
	const { likes, addPostLikeBySlug } = useAnonymousStore()
	console.log(likes)
	const postData = useQuery(api.services.post.getPostBySlug, { slug: post.slugAsParams })
	const like = useMutation(api.services.post.updatePostLikes)

	const currentUserLikes = postData?.likes.find((like: { userId: string }) => like.userId === user?.id)?.count || 0
	const totalLikes = postData?.likes.reduce((acc: number, like: { count: number }) => acc + like.count, 0) || 0

	const [heartFill, setHeartFill] = useState<number>(currentUserLikes)

	const conffetiRef = useRef<HTMLButtonElement>(null)

	const playConffeti = () => {
		const { clientWidth, clientHeight } = document.documentElement
		const boundingBox = conffetiRef.current?.getBoundingClientRect()
		const targetY = boundingBox?.y ?? 0
		const targetX = boundingBox?.x ?? 0
		const targetWidth = boundingBox?.width ?? 0

		const targetCenterX = targetX + targetWidth / 2

		const heartEmoji = confetti.shapeFromText({ text: '❤️', scalar: 2 })
		const partPoperEmoji = confetti.shapeFromText({ text: '🎉', scalar: 2 })

		confetti({
			zIndex: 999,
			particleCount: 100,
			spread: 100,
			origin: {
				y: targetY / clientHeight,
				x: targetCenterX / clientWidth,
			},
			shapes: [heartEmoji, partPoperEmoji],
		})
		confetti({
			zIndex: 999,
			spread: 100,
			origin: {
				y: targetY / clientHeight,
				x: targetCenterX / clientWidth,
			},
			particleCount: 15,
			scalar: 0.8,
			shapes: ['circle'],
		})
	}

	const handleLike = useDebounceCallback(() => {
		addPostLikeBySlug(postData?._id || '')
		playConffeti()
		setHeartFill((prev) => Math.min(prev + 1, 3))
		if (currentUserLikes < 3) {
			if (currentUserLikes === 2) {
				const promise = like({ id: postData?._id || '' })
				toast.promise(promise, {
					success: 'So grateful for your full enthusiasm ❤️',
				})
				return
			}
			like({ id: postData?._id || '' })
		}
	}, 1000)

	return (
		<div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button disabled={!postData} ref={conffetiRef} onClick={handleLike} variant="outline">
							{/* <Heart size={40} className="text-[40px]" /> */}
							<div className="relative size-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="absolute size-full"
								>
									<path
										d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
										fill={`rgba(255, 0, 0, ${heartFill / 3})`}
										stroke="rgba(255, 0, 0, 0.8)"
										strokeWidth="2"
									/>
								</svg>
							</div>
							<Separator orientation="vertical" />
							{totalLikes} 🎉
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Give it a ❤️ and watch the magic!</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
}

export default PostLikeButton

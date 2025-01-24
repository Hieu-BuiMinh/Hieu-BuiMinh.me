'use client'

import { useUser } from '@clerk/clerk-react'
import NumberFlow from '@number-flow/react'
import { useMutation, useQuery } from 'convex/react'
import { ShieldCheckIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'

import type { DevBlogPost, InterestPost } from '@/.velite'
import ImageZoom from '@/components/commons/image/image-zoom'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { formatDate } from '@/lib/utils'

interface IPostDetailHeaderProps {
	post: DevBlogPost | InterestPost
}

export function PostDetailHeader({ post }: IPostDetailHeaderProps) {
	const postData = useQuery(api.services.post.getPostBySlug, { slug: post?.slugAsParams || '' })
	const updatePostView = useMutation(api.services.post.updatePostView)
	const activatePost = useMutation(api.services.post.createPost)
	const isViewUpdated = useRef<boolean>(false)

	const { user } = useUser()
	const currentUser = useQuery(api.services.users.getUserByUserId, { id: user?.id || '' })

	if (!post || !post.published) {
		notFound()
	}

	const handleActivatePost = async () => {
		const promise = activatePost({ slug: post?.slugAsParams || '' })
		toast.promise(promise, {
			success: 'Post activated',
			loading: 'Activating post',
			error: 'Failed to activate post',
		})
	}

	const handleUpdatePostView = useDebounceCallback(async () => {
		if (isViewUpdated.current || !postData) return
		isViewUpdated.current = true
		try {
			await updatePostView({ id: postData._id })
		} catch (error) {
			console.error('Failed to update post view:', error)
		}
	}, 1000)

	useEffect(() => {
		if (postData) {
			handleUpdatePostView()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps, @tanstack/query/no-unstable-deps
	}, [postData])

	return (
		<div className="py-5 md:py-10">
			<div className="absolute left-1/2 top-14 hidden h-[630px] w-full -translate-x-1/2 md:block">
				<ImageZoom
					alt="title"
					src={post?.cover || ''}
					width={1200}
					height={630}
					// className="dot-cover absolute left-1/2 top-14 hidden h-[630px] w-full max-w-7xl -translate-x-1/2 md:block"
					className="dot-cover relative h-[630px] w-full"
				/>
			</div>

			<div className="relative z-10 mt-0 md:mt-[500px] md:rounded-md md:border md:bg-background/30 md:backdrop-blur-sm">
				<h1 className="font-title z-10 bg-gradient-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text py-2 text-center text-4xl font-bold text-transparent dark:from-white dark:via-white/90 dark:to-white/70 md:text-5xl md:leading-[64px]">
					{post.title}
				</h1>

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
						<span>
							<NumberFlow
								willChange
								value={postData?.views || 0}
								format={{ trailingZeroDisplay: 'stripIfInteger' }}
							/>
						</span>
					</div>
					<div className="flex flex-col gap-2 p-2 md:mx-auto">
						<span className="text-muted-foreground">Comments</span>

						<span>
							<NumberFlow
								willChange
								value={postData?.comments.length || 0}
								format={{ trailingZeroDisplay: 'stripIfInteger' }}
							/>
						</span>
					</div>
				</div>
			</div>

			{!postData && postData !== undefined && currentUser?.role === 'AUTHOR' && (
				<Button onClick={handleActivatePost} variant="default" className="my-2 w-full">
					Activate
					<ShieldCheckIcon />
				</Button>
			)}

			<ImageZoom
				alt="title"
				src={post?.cover || ''}
				width={1200}
				height={630}
				className="block rounded-md md:hidden"
			/>

			{!postData && postData !== undefined && (
				<div className="my-4 rounded border border-green-300/70 bg-green-500/20 p-2 text-sm text-foreground/90">
					<p>Note: This post is a work in progress 🧪</p>
					<p>
						Feel free to read and explore, but keep in mind that some sections might still be under
						construction. Your patience is appreciated!
					</p>
				</div>
			)}
		</div>
	)
}

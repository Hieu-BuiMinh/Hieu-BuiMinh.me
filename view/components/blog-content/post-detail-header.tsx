'use client'

import { useMutation, useQuery } from 'convex/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

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

	const handleUpdatePostView = async () => {
		if (!postData || isViewUpdated.current) return
		updatePostView({ id: postData._id }).then(() => {
			isViewUpdated.current = true
		})
	}

	useEffect(() => {
		handleUpdatePostView()
		// eslint-disable-next-line react-hooks/exhaustive-deps, @tanstack/query/no-unstable-deps
	}, [postData])

	return (
		<div className="py-10">
			<h1 className="font-title bg-gradient-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text text-center text-4xl font-bold text-transparent dark:from-white dark:via-white/90 dark:to-white/70 md:text-5xl md:leading-[64px]">
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
					<span>{postData?.views || 0}</span>
				</div>
				<div className="flex flex-col gap-2 p-2 md:mx-auto">
					<span className="text-muted-foreground">Comments</span>
					<span>{100}</span>
				</div>
			</div>

			{!postData && postData !== undefined && (
				<Button onClick={handleActivatePost} variant="secondary" className="my-2 w-full">
					Activate
				</Button>
			)}

			<ImageZoom alt="title" src={post?.cover || ''} width={1200} height={630} />
		</div>
	)
}

'use client'

import NumberFlow from '@number-flow/react'
import { useMutation, useQuery } from 'convex/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

import type { DocPost } from '@/.velite'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { cn, formatDate } from '@/lib/utils'

interface IDocPostDetailHeaderProps {
	post: DocPost
	className?: string
}

function DocPostDetailHeader({ post, className }: IDocPostDetailHeaderProps) {
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
		<div className={cn('relative flex flex-col gap-5 border-b border-dashed pb-5', className)}>
			<h1 className="text-2xl font-bold text-foreground md:text-3xl">{post.title}</h1>

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

			<h2 className="text-foreground">{post.description}</h2>

			{!postData && postData !== undefined && (
				<Button onClick={handleActivatePost} variant="secondary" className="my-2 w-full">
					Activate
				</Button>
			)}
		</div>
	)
}

export default DocPostDetailHeader

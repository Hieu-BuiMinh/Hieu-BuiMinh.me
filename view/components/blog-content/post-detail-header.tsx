import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

import { devBlogPost } from '@/.velite'
import ImageZoom from '@/components/commons/image/image-zoom'
import { formatDate } from '@/lib/utils'

interface IPostDetailHeaderProps {
	params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: IPostDetailHeaderProps['params']) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join('/')
	const post = devBlogPost.find((post) => post.slugAsParams === slug)

	return post
}

export async function PostDetailHeader({ params }: IPostDetailHeaderProps) {
	const post = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

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
					<span>{100}</span>
				</div>
				<div className="flex flex-col gap-2 p-2 md:mx-auto">
					<span className="text-muted-foreground">Comments</span>
					<span>{100}</span>
				</div>
			</div>

			<ImageZoom alt="title" src={post?.cover || ''} width={1200} height={630} />
		</div>
	)
}

import { notFound } from 'next/navigation'
import React from 'react'

import { devBlog } from '@/.velite'
import ImageZoom from '@/components/commons/image/image-zoom'

interface IPostDetailHeaderProps {
	params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: IPostDetailHeaderProps['params']) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join('/')
	const post = devBlog.find((post) => post.slugAsParams === slug)

	return post
}

export async function PostDetailHeader({ params }: IPostDetailHeaderProps) {
	const post = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}
	return (
		<div>
			<h1 className="font-title bg-gradient-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text text-center text-4xl font-bold text-transparent dark:from-white dark:via-white/90 dark:to-white/70 md:text-5xl md:leading-[64px]">
				{post.title}
			</h1>

			<div className="grid grid-cols-2 border text-sm max-md:gap-4 md:grid-cols-4"></div>

			<ImageZoom alt="title" src={`/assets/images/${post.slug}/cover.png`} width={1200} height={630} />
		</div>
	)
}

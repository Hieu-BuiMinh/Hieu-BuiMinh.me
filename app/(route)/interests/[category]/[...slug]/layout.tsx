import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import type { InterestPost } from '@/.velite'
import { interests } from '@/.velite'
import { SITE_CONFIG } from '@/config/site'
import { PostDetailHeader } from '@/view/components/blog-content/post-detail-header'

interface PostPageProps {
	params: Promise<{ category: string; slug: string[] }>
}

async function getPostFromParams(params: PostPageProps['params']) {
	const resolvedParams = await params
	const slug = [resolvedParams.category, ...resolvedParams.slug].join('/')
	const post = interests.find((post) => post.slugAsParams === slug)

	return post as InterestPost
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
	const post = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

	return {
		title: post.title,
		description: post.description,
		authors: { name: SITE_CONFIG.author.name },
		openGraph: {
			title: post.title,
			description: post.description,
			type: 'article',
			url: post.slug,
			images: [
				{
					url: post.cover || '',
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.description,
			images: [post.cover || ''],
		},
	}
}

async function InterestDetailLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ category: string; slug: string[] }>
}) {
	const post = await getPostFromParams(params)
	return (
		<>
			<PostDetailHeader post={post} />
			{children}
		</>
	)
}

export default InterestDetailLayout

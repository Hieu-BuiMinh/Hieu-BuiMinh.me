import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { interests } from '@/.velite'
import { SITE_CONFIG } from '@/config/site'
import { PostDetailHeader } from '@/view/components/blog-content/post-detail-header'

interface PostPageProps {
	params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: PostPageProps['params']) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join('/')
	const post = interests.find((post) => post.slugAsParams === slug)

	return post
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
	const post = await getPostFromParams(params)

	if (!post) {
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

function InterestDetailLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ slug: string[] }>
}) {
	return (
		<>
			<PostDetailHeader params={params} />
			{children}
		</>
	)
}

export default InterestDetailLayout

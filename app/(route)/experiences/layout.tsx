import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { pages } from '@/.velite'
import { SITE_CONFIG } from '@/config/site'

export async function generateMetadata(): Promise<Metadata> {
	const post = pages.find((post) => post.slugAsParams === 'experiences')

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
					url: post.cover || SITE_CONFIG.og,
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
			images: [post.cover || SITE_CONFIG.og],
		},
	}
}

function ExperiencesLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto max-w-screen-xl p-3 md:px-10 md:py-6">{children}</div>
}

export default ExperiencesLayout

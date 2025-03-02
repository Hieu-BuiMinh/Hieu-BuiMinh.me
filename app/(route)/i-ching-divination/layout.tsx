import '@/components/commons/mdx/style/yin-yang.css'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { pages } from '@/.velite'
import { SITE_CONFIG } from '@/config/site'

const title = 'I-Ching Divination'
const description = `...`

export async function generateMetadata(): Promise<Metadata> {
	const post = pages.find((post) => post.slugAsParams === 'quotes')

	if (!post) {
		notFound()
	}

	return {
		title: title,
		description: description,
		authors: { name: SITE_CONFIG.author.name },
		openGraph: {
			title: title,
			description: description,
			type: 'article',
			url: post.slug,
			images: [
				{
					url: post.cover || SITE_CONFIG.og,
					width: 1200,
					height: 630,
					alt: title,
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

function IChingDivinationLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto max-w-screen-xl p-3 md:px-10 md:py-6">{children}</div>
}

export default IChingDivinationLayout

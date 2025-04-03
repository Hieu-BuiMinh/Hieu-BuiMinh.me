import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import type { DocPost } from '@/.velite'
import { docs } from '@/.velite'
import { SITE_CONFIG } from '@/config/site'
import DocSidebar from '@/view/components/doc-content/sidebar'

interface IDocsCategoryLayoutProps {
	params: Promise<{ category: string }>
	children: React.ReactNode
}

async function getPostFromParams(params: IDocsCategoryLayoutProps['params']) {
	const resolvedParams = await params
	const post = docs.find((post) => post.slugAsParams === resolvedParams.category)

	return post as DocPost
}

export async function generateMetadata({ params }: IDocsCategoryLayoutProps): Promise<Metadata> {
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

async function DocsCategoryLayout({ params, children }: IDocsCategoryLayoutProps) {
	let rootPost: DocPost
	const resolveCategory = await params

	const currentPost = docs.find((p) => p.slugAsParams === resolveCategory.category)
	const currentPostIsRoot = currentPost?.type === 'ROOT'

	if (!currentPost) {
		notFound()
	}

	if (currentPost) {
		if (currentPostIsRoot) {
			rootPost = currentPost
		} else {
			rootPost = docs.find((p) => p.id === p.root)
		}
	}

	return (
		<div className="grid border-none md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] 2xl:border-x 2xl:border-dashed">
			<DocSidebar sidebarOrder={rootPost?.order || []} />
			{children}
		</div>
	)
}

export default DocsCategoryLayout

import { notFound } from 'next/navigation'
import React from 'react'

import { docs } from '@/.velite'
import { docPostsHierarchy } from '@/lib/content/docs'
import DocSidebar from '@/view/components/doc-content/sidebar'

interface IDocsCategoryLayoutProps {
	params: Promise<{ category: string }>
	children: React.ReactNode
}

async function DocsCategoryLayout({ params, children }: IDocsCategoryLayoutProps) {
	const resolveCategory = await params

	const currentPost = docs.find((p) => p.slugAsParams === resolveCategory.category)
	const currentPostIsRoot = currentPost?.type === 'ROOT'

	if (!currentPost) {
		notFound()
	}

	const childPosts = currentPostIsRoot
		? docs.filter((p) => p.root === currentPost?.id && p.published)
		: docs.filter((p) => p.root === currentPost?.root && p.published)

	const sidebarData = docPostsHierarchy([currentPost, ...childPosts], resolveCategory.category)

	return (
		<div className="grid border-none md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] 2xl:border-x 2xl:border-dashed">
			<DocSidebar sidebarData={sidebarData} />
			{children}
		</div>
	)
}

export default DocsCategoryLayout

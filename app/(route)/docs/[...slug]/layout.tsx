import { notFound } from 'next/navigation'
import React from 'react'

import { docs } from '@/.velite'
import DocSidebar from '@/view/components/doc-content/sidebar'

interface PostPageProps {
	children: React.ReactNode
	params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: PostPageProps['params']) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join('/')
	const post = docs.find((post) => post.slugAsParams === slug)

	return post
}

async function DocDetailLayout({ children, params }: PostPageProps) {
	const post = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

	return (
		<div className="grid border-none md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] 2xl:border-x 2xl:border-dashed">
			<DocSidebar post={post} />
			{children}
		</div>
	)
}

export default DocDetailLayout

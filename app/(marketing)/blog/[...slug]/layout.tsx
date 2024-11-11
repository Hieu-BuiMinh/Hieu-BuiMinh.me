import React from 'react'

import { PostDetailHeader } from '@/view/marketing/blog/components/post-detail-header'

function BlogDetailLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string[] }> }) {
	return (
		<div>
			<PostDetailHeader params={params} />
			{children}
		</div>
	)
}

export default BlogDetailLayout

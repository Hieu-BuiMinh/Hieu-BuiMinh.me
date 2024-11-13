import React from 'react'

import { PostDetailHeader } from '@/view/components/post-detail-header'

function BlogDetailLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string[] }> }) {
	return (
		<>
			<PostDetailHeader params={params} />
			{children}
		</>
	)
}

export default BlogDetailLayout

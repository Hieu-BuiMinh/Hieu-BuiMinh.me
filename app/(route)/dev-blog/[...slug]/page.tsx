import React from 'react'

import DevBlogDetailPageView from '@/view/route/dev-blog/pages/dev-blog-detail.page'

interface IPostPageProps {
	params: Promise<{ slug: string[] }>
}

function BlogDetailPage({ params }: IPostPageProps) {
	return <DevBlogDetailPageView params={params} />
}

export default BlogDetailPage

import React from 'react'

import BlogDetailPageView from '@/view/route/blog/pages/blog-detail.page'

interface IPostPageProps {
	params: Promise<{ slug: string[] }>
}

function BlogDetailPage({ params }: IPostPageProps) {
	return <BlogDetailPageView params={params} />
}

export default BlogDetailPage

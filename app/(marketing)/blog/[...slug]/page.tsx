import React from 'react'

import BlogDetailPageView from '@/view/marketing/blog/pages/blog-detail.page'

interface IPostPageProps {
	params: Promise<{ slug: string[] }>
}

function BlogDetailPage({ params }: IPostPageProps) {
	return <BlogDetailPageView params={params} />
}

export default BlogDetailPage

import React from 'react'

import BlogDetailPageView from '@/view/marketing/blog/pages/blog-detail.page'

interface PostPageProps {
	params: Promise<{ slug: string[] }>
}

function BlogDetailPage({ params }: PostPageProps) {
	return <BlogDetailPageView params={params} />
}

export default BlogDetailPage

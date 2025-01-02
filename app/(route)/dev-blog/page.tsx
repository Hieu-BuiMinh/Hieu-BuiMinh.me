import DevBlogPageView from '@/view/route/dev-blog/pages/dev-blog.page'

interface IBlogpageProps {
	searchParams: Promise<{ page?: string }>
}

function BlogPage({ searchParams }: IBlogpageProps) {
	return <DevBlogPageView searchParams={searchParams} />
}

export default BlogPage

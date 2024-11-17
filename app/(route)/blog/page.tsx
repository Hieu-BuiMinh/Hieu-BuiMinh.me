import BlogPageView from '@/view/route/blog/pages/blog.page'

interface IBlogpageProps {
	searchParams: Promise<{ page?: string }>
}

function BlogPage({ searchParams }: IBlogpageProps) {
	return <BlogPageView searchParams={searchParams} />
}

export default BlogPage

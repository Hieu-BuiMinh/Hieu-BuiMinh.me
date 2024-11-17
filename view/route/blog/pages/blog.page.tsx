import { getAllTags, sortPosts, sortTagsByCount } from '@/lib/posts'
import PageTitle from '@/view/components/blog-content/page-title'
import PostCards from '@/view/components/blog-content/post-cards'
import PostPagination from '@/view/components/blog-content/post-pagination'
import { Tag } from '@/view/components/blog-content/tag'
import { devBlogPost } from '#site/content'

interface IBlogpageProps {
	searchParams: Promise<{ page?: string }>
}

const title = 'Blog'
const description =
	'My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences. As a frontend developer from Vietnam, I started learning web development as a hobby in December 2020. I use Next.js for building websites, GitHub for code hosting, and Vercel for deployment. Explore my site to learn more about my Journey and discover some of the web development resources that have inspired me.'

const POSTS_PER_PAGE = 2

async function BlogPageView({ searchParams }: IBlogpageProps) {
	const resolvedSearchParams = await searchParams
	const tags = getAllTags(devBlogPost)
	const sortedTags = sortTagsByCount(tags)
	const sortedPosts = sortPosts(devBlogPost.filter((post) => post.published))

	const currentPage = Number(resolvedSearchParams?.page) || 1
	const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

	const displayPosts = sortedPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)

	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />
			<div className="group flex flex-wrap gap-3 py-3">
				{sortedTags?.map((tag) => <Tag tag={tag} key={tag} count={tags[tag]} />)}
			</div>
			{displayPosts?.length > 0 ? <PostCards root="blog" posts={displayPosts} /> : <p>Nothing to see here yet</p>}
			<PostPagination totalPages={totalPages} className="mt-4 justify-end" />
		</div>
	)
}

export default BlogPageView

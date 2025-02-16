import { getAllTags, sortPostsByDate, sortTagsByCount } from '@/lib/content/posts'
import PageTitle from '@/view/components/blog-content/page-title'
import PostCards from '@/view/components/blog-content/post-cards'
import PostPagination from '@/view/components/blog-content/post-pagination'
import { Tag } from '@/view/components/blog-content/tag'
import { devBlogPosts } from '#site/content'

interface IBlogpageProps {
	searchParams: Promise<{ page?: string }>
}

const title = 'Blog'
const description =
	'My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences.'

const POSTS_PER_PAGE = 10

async function DevBlogPageView({ searchParams }: IBlogpageProps) {
	const resolvedSearchParams = await searchParams
	const tags = getAllTags(devBlogPosts)
	const sortedTags = sortTagsByCount(tags)
	const sortedPosts = sortPostsByDate(
		devBlogPosts.filter((post) => post.published),
		'desc'
	)

	const currentPage = Number(resolvedSearchParams?.page) || 1
	const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

	const displayPosts = sortedPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)

	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />

			<div className="group flex flex-wrap gap-3 py-3">
				{sortedTags?.map((tag) => <Tag tag={tag} key={tag} count={tags[tag]} />)}
			</div>

			{displayPosts?.length > 0 ? <PostCards posts={displayPosts} /> : <p>I have no posts yet... ㄟ( ▔, ▔ )ㄏ</p>}
			<PostPagination totalPages={totalPages} className="mt-4 justify-end" />
		</div>
	)
}

export default DevBlogPageView

import { getAllTags, sortTagsByCount } from '@/lib/posts'
import PageTitle from '@/view/components/page-title'
import PostCards from '@/view/components/post-cards'
import { Tag } from '@/view/components/tag'
import { devBlog } from '#site/content'

const title = 'Blog'
const description =
	'My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences. As a frontend developer from Vietnam, I started learning web development as a hobby in December 2020. I use Next.js for building websites, GitHub for code hosting, and Vercel for deployment. Explore my site to learn more about my Journey and discover some of the web development resources that have inspired me.'

function BlogPageView() {
	const tags = getAllTags(devBlog)
	const sortedTags = sortTagsByCount(tags)

	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />
			<div className="group flex gap-3 py-3">
				{sortedTags?.map((tag) => <Tag tag={tag} key={tag} count={tags[tag]} />)}
			</div>
			{devBlog?.length > 0 ? <PostCards root="blog" posts={devBlog} /> : <p>Nothing to see here yet</p>}
		</div>
	)
}

export default BlogPageView

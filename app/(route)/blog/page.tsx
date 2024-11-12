import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllTags, sortTagsByCount } from '@/lib/posts'
import PageTitle from '@/view/route/blog/components/page-title'
import PostCards from '@/view/route/blog/components/post-cards'
import { Tag } from '@/view/route/blog/components/tag'
import { devBlog } from '#site/content'

const title = 'Blog'
const description =
	'My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences. As a full-stack developer from Hong Kong, I started learning web development as a hobby in December 2020. I use Next.js for building websites, GitHub for code hosting, and Vercel for deployment. Explore my site to learn more about my Journey and discover some of the web development resources that have inspired me.'

function BlogPage() {
	const tags = getAllTags(devBlog)
	const sortedTags = sortTagsByCount(tags)

	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />
			{/* <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="mt-8 grid grid-cols-12 gap-3">
					<Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
						<CardHeader>
							<CardTitle>Tags</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-wrap gap-2">
							{sortedTags?.map((tag) => <Tag tag={tag} key={tag} count={tags[tag]} />)}
						</CardContent>
					</Card>
				</div>
			</div> */}
			{devBlog?.length > 0 ? <PostCards posts={devBlog} /> : <p>Nothing to see here yet</p>}
		</div>
	)
}

export default BlogPage

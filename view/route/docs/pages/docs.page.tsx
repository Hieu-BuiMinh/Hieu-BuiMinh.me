import { Octagon } from 'lucide-react'
import React from 'react'

import { docs } from '@/.velite'
import { getAllTags, sortPostsByDate, sortTagsByCount } from '@/lib/content/posts'
import PageTitle from '@/view/components/blog-content/page-title'
import PostCards from '@/view/components/blog-content/post-cards'
import PostPagination from '@/view/components/blog-content/post-pagination'
import { Tag } from '@/view/components/blog-content/tag'

interface IDocPageProps {
	searchParams: Promise<{ page?: string }>
}

const title = 'Docs'
const description =
	'Welcome to my collection of insights on ancient wisdom and philosophical concepts. Here, I delve into the timeless teachings of the Yi Jing (I Ching), the profound principles of Yin Yang, and other thought-provoking topics that explore the balance between opposites, the flow of energy, and the interconnectedness of all things 🌵'

const POSTS_PER_PAGE = 10

async function DocsPageView({ searchParams }: IDocPageProps) {
	const resolvedSearchParams = await searchParams
	const sortedPosts = sortPostsByDate(
		docs.filter((post) => post.published && post.type === 'ROOT'),
		'desc'
	)

	const currentPage = Number(resolvedSearchParams?.page) || 1
	const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

	const displayPosts = sortedPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)

	const tags = getAllTags(displayPosts)
	const sortedTags = sortTagsByCount(tags)

	return (
		<div className="m-auto max-w-screen-lg p-3 md:px-10 md:py-6">
			<div className="container flex max-w-4xl flex-col gap-3">
				<PageTitle title={title} description={description} icon={Octagon} />

				<div className="group flex flex-wrap gap-3 py-3">
					{sortedTags?.map((tag) => <Tag tag={tag} key={tag} count={tags[tag]} />)}
				</div>

				{displayPosts?.length > 0 ? (
					<PostCards posts={displayPosts} />
				) : (
					<p>I have no posts yet... ㄟ( ▔, ▔ )ㄏ</p>
				)}
				<PostPagination totalPages={totalPages} className="mt-4 justify-end" />
			</div>
		</div>
	)
}

export default DocsPageView

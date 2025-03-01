import React from 'react'

import { retros } from '@/.velite'
import { getAllTags, sortPostsByDate, sortTagsByCount } from '@/lib/content/posts'
import PageTitle from '@/view/components/blog-content/page-title'
import PostCards from '@/view/components/blog-content/post-cards'
import PostPagination from '@/view/components/blog-content/post-pagination'
import { Tag } from '@/view/components/blog-content/tag'

interface IRetrosPageProps {
	searchParams: Promise<{ page?: string }>
}

const title = 'Retrospective'
const description = `Every year, I share my progress both in career and personal life. Here's how it's going`

const POSTS_PER_PAGE = 10

async function RetrosPageView({ searchParams }: IRetrosPageProps) {
	const resolvedSearchParams = await searchParams
	const tags = getAllTags(retros)
	const sortedTags = sortTagsByCount(tags)
	const sortedPosts = sortPostsByDate(
		retros.filter((post) => post.published),
		'desc'
	)

	const currentPage = Number(resolvedSearchParams?.page) || 1
	const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

	const displayPosts = sortedPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)

	return (
		<div className="container m-auto flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />

			<div className="group flex flex-wrap gap-3 py-3">
				{sortedTags?.map((tag) => <Tag tag={tag} key={tag} count={tags[tag]} />)}
			</div>

			{displayPosts?.length > 0 ? <PostCards posts={displayPosts} /> : <p>I have no posts yet... ㄟ( ▔, ▔ )ㄏ</p>}
			<PostPagination totalPages={totalPages} className="mt-4 justify-end" />
		</div>
	)
}

export default RetrosPageView

import React from 'react'

import { docs } from '@/.velite'
import { sortPosts } from '@/lib/content/posts'
import PageTitle from '@/view/components/blog-content/page-title'
import PostCards from '@/view/components/blog-content/post-cards'
import PostPagination from '@/view/components/blog-content/post-pagination'

interface IDocPageProps {
	searchParams: Promise<{ page?: string }>
}

const title = 'Docs'
const description =
	'My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences. As a frontend developer from Vietnam, I started learning web development as a hobby in December 2020. I use Next.js for building websites, GitHub for code hosting, and Vercel for deployment. Explore my site to learn more about my Journey and discover some of the web development resources that have inspired me 😘'

const POSTS_PER_PAGE = 10

async function DocsPageView({ searchParams }: IDocPageProps) {
	const resolvedSearchParams = await searchParams
	const sortedPosts = sortPosts(docs.filter((post) => post.published && post.type === 'ROOT'))

	const currentPage = Number(resolvedSearchParams?.page) || 1
	const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

	const displayPosts = sortedPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)

	return (
		<div className="m-auto max-w-screen-lg p-3 md:px-10 md:py-6">
			<div className="container flex max-w-4xl flex-col gap-3">
				<PageTitle title={title} description={description} />
				{displayPosts?.length > 0 ? (
					<PostCards root="docs" posts={displayPosts} />
				) : (
					<p>I have no posts yet... ㄟ( ▔, ▔ )ㄏ</p>
				)}
				<PostPagination totalPages={totalPages} className="mt-4 justify-end" />
			</div>
		</div>
	)
}

export default DocsPageView

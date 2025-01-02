'use client'

import { notFound } from 'next/navigation'
import { useQueryState } from 'nuqs'
import type { ChangeEvent } from 'react'

import type { DevBlogPost, DocPost, InterestPost } from '@/.velite'
import { devBlogPosts, docs, interests } from '@/.velite'
import { Input } from '@/components/ui/input'
import { sortPostsByDate } from '@/lib/content/posts'
import PostCards from '@/view/components/blog-content/post-cards'
import PostPagination from '@/view/components/blog-content/post-pagination'

const allTagsFormPosts = (): (DevBlogPost & DocPost & InterestPost)[] => {
	const devPosts = devBlogPosts
	const docPosts = docs.filter((p) => p.type !== 'ROOT')
	const interestPosts = interests.filter((p) => p.type !== 'ROOT')

	return [...devPosts, ...docPosts, ...interestPosts]
}

const POSTS_PER_PAGE = 12

function TagNamePageView({ slug, page }: { slug: string; page?: string }) {
	const [searchValue, setSearchValue] = useQueryState('title', { defaultValue: '' })

	const postsByTagName = allTagsFormPosts().filter((p: DevBlogPost & DocPost & InterestPost) =>
		p.hashTags.tags.includes(slug)
	)

	const handleSearching = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSearchValue(value)
	}

	if (!postsByTagName) {
		notFound()
	}

	const sortedPosts = sortPostsByDate(
		postsByTagName.filter((post) => post.published),
		'desc'
	)

	const currentPage = Number(page) || 1
	const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

	const displayPosts = !searchValue
		? sortedPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)
		: sortedPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))

	return (
		<>
			<div className="relative m-auto flex max-w-screen-lg flex-col gap-5 py-5">
				<Input
					type="text"
					value={searchValue}
					onChange={handleSearching}
					placeholder="Search articles"
					aria-label="Search articles"
					className="sticky top-16 z-10 w-full border-none bg-foreground text-sm text-background focus-visible:ring-0 focus-visible:ring-offset-0"
					id="search"
				/>
				{displayPosts.length > 0 ? (
					<PostCards posts={displayPosts} />
				) : (
					<p className="py-5 text-center">I don&apos;t have that post ㄟ( ▔, ▔ )ㄏ</p>
				)}
			</div>

			{!searchValue && <PostPagination totalPages={totalPages} className="mt-4 justify-end" />}
		</>
	)
}

export default TagNamePageView

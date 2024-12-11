import { notFound } from 'next/navigation'

import type { InterestPost } from '@/.velite'
import { docs, interests } from '@/.velite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { sortPosts } from '@/lib/content/posts'
import PageTitle from '@/view/components/blog-content/page-title'
import PostCards from '@/view/components/blog-content/post-cards'
import PostPagination from '@/view/components/blog-content/post-pagination'

interface ICategoryPageProps {
	params: Promise<{ category: string }>
	searchParams: Promise<{ page?: string }>
}

function getPostIntroFromSlug(slug: string) {
	const post = interests.find((post) => post.slugAsParams === slug)

	return post as InterestPost
}

const POSTS_PER_PAGE = 10

async function CategoryPage({ params, searchParams }: ICategoryPageProps) {
	const resolvedSearchParams = await searchParams
	const category = (await params).category

	const post = getPostIntroFromSlug(`${category}`)
	const postsBelongToThisCategory = interests.filter(
		(post) => post.hashTags?.category === category && post.slugAsParams !== `${category}`
	)
	const docsBelongToThisCategory = docs.filter((post) => post.hashTags?.category === category && post.type === 'ROOT')
	const hasTutor = docsBelongToThisCategory.length > 0

	if (!post && !docsBelongToThisCategory) {
		notFound()
	}

	// paging for interests posts
	const sortedPosts = sortPosts(postsBelongToThisCategory.filter((post) => post.published))
	const currentPage = Number(resolvedSearchParams?.page) || 1
	const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
	const displayPosts = sortedPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)

	return (
		<div className="m-auto flex max-w-screen-lg flex-col gap-3 p-3 md:px-10 md:py-6">
			<PageTitle title={post.title} description={post.description || ''} />

			{!hasTutor && (
				<>
					{postsBelongToThisCategory?.length > 0 ? (
						<PostCards root="interests" posts={displayPosts} />
					) : (
						<p>I have no posts yet... ㄟ( ▔, ▔ )ㄏ</p>
					)}
					<PostPagination totalPages={totalPages} className="mt-4 justify-end" />
				</>
			)}

			{hasTutor && (
				<Tabs defaultValue="posts">
					<TabsList>
						<TabsTrigger value="posts">Posts</TabsTrigger>
						<TabsTrigger value="docs">Tutor</TabsTrigger>
					</TabsList>
					<TabsContent className="mt-5" value="posts">
						{postsBelongToThisCategory?.length > 0 ? (
							<PostCards root="interests" posts={displayPosts} />
						) : (
							<p>I have no posts yet... ㄟ( ▔, ▔ )ㄏ</p>
						)}
						<PostPagination totalPages={totalPages} className="mt-4 justify-end" />
					</TabsContent>
					<TabsContent className="mt-5" value="docs">
						{docsBelongToThisCategory?.length > 0 ? (
							<PostCards root="docs" posts={docsBelongToThisCategory} />
						) : (
							<p>I have no posts yet... ㄟ( ▔, ▔ )ㄏ</p>
						)}
					</TabsContent>
				</Tabs>
			)}
		</div>
	)
}

export default CategoryPage

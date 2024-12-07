import { notFound } from 'next/navigation'

import type { InterestPost } from '@/.velite'
import { interests } from '@/.velite'
import PageTitle from '@/view/components/blog-content/page-title'

interface ICategoryPageProps {
	params: Promise<{ category: string }>
}

function getPostIntroFromSlug(slug: string) {
	const post = interests.find((post) => post.slugAsParams === slug)

	return post as InterestPost
}

async function CategoryPage({ params }: ICategoryPageProps) {
	const category = (await params).category

	const post = getPostIntroFromSlug(`${category}/intro`)
	const postsBelongToThisCategory = interests.filter(
		(post) => post.hashTags?.category === category && post.slugAsParams !== `${category}/intro`
	)

	console.log(postsBelongToThisCategory)

	if (!post) {
		notFound()
	}

	return (
		<div className="m-auto flex max-w-screen-lg flex-col gap-8 p-3 md:px-10 md:py-6">
			<PageTitle title={post.title} description={post.description || ''} />
		</div>
	)
}

export default CategoryPage

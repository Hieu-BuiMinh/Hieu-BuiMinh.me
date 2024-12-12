import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import type { InterestPost } from '@/.velite'
import { interests } from '@/.velite'
import { SITE_CONFIG } from '@/config/site'
import CategoryPageView from '@/view/route/interests/pages/category.page'

interface ICategoryPageProps {
	params: Promise<{ category: string }>
	searchParams: Promise<{ page?: string }>
}

function getPostIntroFromSlug(slug: string) {
	const post = interests.find((post) => post.slugAsParams === slug)

	return post as InterestPost
}

export async function generateMetadata({ params }: ICategoryPageProps): Promise<Metadata> {
	const category = (await params).category
	const post = getPostIntroFromSlug(category)

	if (!post || !post.published) {
		notFound()
	}

	return {
		title: post.title,
		description: post.description,
		authors: { name: SITE_CONFIG.author.name },
		openGraph: {
			title: post.title,
			description: post.description,
			type: 'article',
			url: post.slug,
			images: [
				{
					url: post.cover || SITE_CONFIG.og,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.description,
			images: [post.cover || SITE_CONFIG.og],
		},
	}
}

async function CategoryPage({ params, searchParams }: ICategoryPageProps) {
	return <CategoryPageView params={params} searchParams={searchParams} />
}

export default CategoryPage

import { notFound } from 'next/navigation'

import type { InterestPost } from '@/.velite'
import { interests } from '@/.velite'
import CategoryCards from '@/view/components/blog-content/category-cards'
import PageTitle from '@/view/components/blog-content/page-title'

const title = 'Interest'
const description = `Welcome to Interest, a blog dedicated to exploring the things that inspire curiosity and spark creativity! Whether it's religious, books, hobbies, or everyday discoveries, this is a space to dive deep into the fascinating world around us. Join me on this journey of learning and sharing ideas that make life interesting 😎`

function findUniqueCategories(posts: InterestPost[]) {
	// use a Set to collect unique categories
	const uniqueCategories = new Set()

	posts.forEach((post) => {
		if (post.hashTags && post.hashTags.category) {
			uniqueCategories.add(`${post.hashTags.category}`)
		}
	})

	// convert the Set back to an array for easier usage
	return Array.from(uniqueCategories) as string[]
}

function getPostIntroFromSlug(slug: string) {
	const post = interests.find((post) => post.slugAsParams === slug)

	return post as InterestPost
}

async function InterestsPageView() {
	const allCategories = findUniqueCategories(interests).map((category) => ({
		slug: `${category}/intro`,
		href: `/interests/${category}`,
	}))

	if (!allCategories) {
		notFound()
	}

	const categoriesIntro = allCategories
		.map((category) => getPostIntroFromSlug(category.slug))
		.map((intro, index) => {
			return {
				title: intro.title,
				href: allCategories[index].href,
				cover: intro.cover || '',
				description: intro.description || '',
			}
		})

	return (
		<div className="m-auto flex max-w-screen-lg flex-col gap-8 p-3 md:px-10 md:py-6">
			<PageTitle title={title} description={description} />

			<CategoryCards categories={categoriesIntro} />
		</div>
	)
}

export default InterestsPageView

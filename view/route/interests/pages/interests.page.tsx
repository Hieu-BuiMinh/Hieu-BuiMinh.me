import { notFound } from 'next/navigation'

import type { InterestPost } from '@/.velite'
import { interests } from '@/.velite'
import CategoryCards from '@/view/components/blog-content/category-cards'
import PageTitle from '@/view/components/blog-content/page-title'

const title = 'Interest'
const description = `Welcome to Interest, a blog dedicated to exploring the things that inspire curiosity and spark creativity! Whether it's religious, books, hobbies, or everyday discoveries, this is a space to dive deep into the fascinating world around us. Join me on this journey of learning and sharing ideas that make life interesting`

async function InterestsPageView() {
	const rootCategories: InterestPost[] = interests.filter((post) => post.type === 'ROOT')

	if (!rootCategories) {
		notFound()
	}

	const categoriesIntro = rootCategories.map((intro) => {
		return {
			title: intro.title,
			href: intro.slug,
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

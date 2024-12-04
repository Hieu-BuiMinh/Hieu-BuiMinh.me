import type { Category } from '@/view/components/blog-content/category-cards'
import CategoryCards from '@/view/components/blog-content/category-cards'

function InterestsPageView() {
	const categories: Category[] = [
		{
			title: 'Mysticism',
			href: 'interests/mysticism',
			category: 'interests/mysticism',
			cover: '/assets/images/content/post/dev-blog/common-copmponents-compilation/cover.png',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		},
		{
			title: 'Buddhism',
			href: 'interests/buddhism',
			category: 'interests/buddhism',
			cover: '/assets/images/content/post/dev-blog/common-copmponents-compilation/cover.png',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		},
	]

	return (
		<div className="flex gap-2">
			<CategoryCards categories={categories} />
		</div>
	)
}

export default InterestsPageView

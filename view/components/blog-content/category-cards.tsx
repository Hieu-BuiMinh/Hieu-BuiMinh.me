import CategoryCard from '@/view/components/blog-content/category-card'

export type Category = {
	title: string
	href: string
	cover: string
	description: string
}

interface CategoryCardsProps {
	categories: Category[]
}

const CategoryCards = ({ categories }: CategoryCardsProps) => {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 ">
			{categories.map((category) => (
				<CategoryCard key={category.title} data={category} />
			))}
		</div>
	)
}

export default CategoryCards

interface ICategoryPageProps {
	params: Promise<{ category: string }>
}

async function CategoryPage({ params }: ICategoryPageProps) {
	const category = (await params).category

	return <div>CategoryPage</div>
}

export default CategoryPage

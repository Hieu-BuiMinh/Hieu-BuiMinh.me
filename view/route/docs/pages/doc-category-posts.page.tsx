interface IDocsCategoryPageProps {
	params: Promise<{ category: string }>
}

async function DocCategoryPostsPageView({ params }: IDocsCategoryPageProps) {
	return <div>DocCategoryPostsPageView</div>
}

export default DocCategoryPostsPageView

interface IDocsCategoryPageProps {
	params: Promise<{ category: string }>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function DocCategoryPostsPageView({ params }: IDocsCategoryPageProps) {
	return <div>DocCategoryPostsPageView</div>
}

export default DocCategoryPostsPageView

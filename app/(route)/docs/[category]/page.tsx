import DocDetailPageView from '@/view/route/docs/pages/doc-detail.page'

interface IDocsCategoryPageProps {
	params: Promise<{ category: string }>
}
async function DocsCategoryPage({ params }: IDocsCategoryPageProps) {
	const resolvedParams = await params
	const slug = resolvedParams.category

	return <DocDetailPageView slug={slug} />
}

export default DocsCategoryPage

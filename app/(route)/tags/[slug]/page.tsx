import TagNamePageView from '@/view/route/tags/pages/tag-name.page'

interface PageProps {
	params: Promise<{ slug: string }>
	searchParams: Promise<{ page?: string }>
}

async function TagNamePage({ params, searchParams }: PageProps) {
	const { slug } = await params
	const { page } = await searchParams

	return <TagNamePageView slug={slug} page={page} />
}

export default TagNamePage

import RetrosDetailPageView from '@/view/route/retros/pages/retros-detail.page'

interface IPostPageProps {
	params: Promise<{ slug: string[] }>
}

function RetrosDetailPage({ params }: IPostPageProps) {
	return <RetrosDetailPageView params={params} />
}

export default RetrosDetailPage

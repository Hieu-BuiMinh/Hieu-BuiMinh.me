import RetrosPageView from '@/view/route/retros/pages/retros.page'

interface IRetrospageProps {
	searchParams: Promise<{ page?: string }>
}

function RetrosPage({ searchParams }: IRetrospageProps) {
	return <RetrosPageView searchParams={searchParams} />
}

export default RetrosPage

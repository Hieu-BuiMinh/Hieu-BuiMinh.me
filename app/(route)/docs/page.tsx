import React from 'react'

import DocsPageView from '@/view/route/docs/pages/docs.page'

interface IDocPageProps {
	searchParams: Promise<{ page?: string }>
}

function DocPage({ searchParams }: IDocPageProps) {
	return <DocsPageView searchParams={searchParams} />
}

export default DocPage

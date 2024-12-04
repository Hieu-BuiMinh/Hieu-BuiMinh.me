import React from 'react'

import InterestsDetailPage from '@/view/route/about/pages/interests/pages/interests-detail.page'

interface IInterestsPageDetailProps {
	params: Promise<{ slug: string[] }>
}

function InterestsPageDetail({ params }: IInterestsPageDetailProps) {
	return <InterestsDetailPage params={params} />
}

export default InterestsPageDetail

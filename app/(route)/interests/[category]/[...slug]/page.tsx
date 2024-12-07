import React from 'react'

import InterestsDetailPage from '@/view/route/interests/pages/interests-detail.page'

interface IInterestsPageDetailProps {
	params: Promise<{ category: string; slug: string[] }>
}

function InterestsPageDetail({ params }: IInterestsPageDetailProps) {
	return <InterestsDetailPage params={params} />
}

export default InterestsPageDetail

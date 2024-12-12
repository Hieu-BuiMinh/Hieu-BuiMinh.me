import React from 'react'

import CategoryDetailPage from '@/view/route/interests/pages/category-detail.page'

interface IInterestsPageDetailProps {
	params: Promise<{ category: string; slug: string[] }>
}

function InterestsPageDetail({ params }: IInterestsPageDetailProps) {
	return <CategoryDetailPage params={params} />
}

export default InterestsPageDetail

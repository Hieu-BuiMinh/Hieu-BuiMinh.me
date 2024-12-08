import React from 'react'

import DocDetailPageView from '@/view/route/docs/pages/doc-detail.page'

interface PostPageProps {
	params: Promise<{ slug: string[] }>
}

function DocPageDetail({ params }: PostPageProps) {
	return <DocDetailPageView params={params} />
}

export default DocPageDetail

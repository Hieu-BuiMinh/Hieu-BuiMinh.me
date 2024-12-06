import type { Metadata } from 'next'
import React from 'react'

import InterestsPageView from '@/view/route/about/pages/interests/pages/interests.page'

export const metadata: Metadata = {
	title: 'My interests',
	description: `A place to explore the things I'm passionate about and love sharing `,
}

function InterestsPage() {
	return <InterestsPageView />
}

export default InterestsPage

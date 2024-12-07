import type { Metadata } from 'next'

import InterestsPageView from '@/view/route/interests/pages/interests.page'

export const metadata: Metadata = {
	title: 'My interests',
	description: `A place to explore the things I'm passionate about and love sharing `,
}

function InterestsPage() {
	return <InterestsPageView />
}

export default InterestsPage

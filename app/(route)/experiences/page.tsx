import type { Metadata } from 'next'

import ExperiencesPageView from '@/view/route/experiences/pages/experiences.page'

export const metadata: Metadata = {
	title: 'Experiences me',
	description: `I'm Hieu A Frontend Developer Creating websites using React.`,
}

function ExperiencesPage() {
	return <ExperiencesPageView />
}

export default ExperiencesPage

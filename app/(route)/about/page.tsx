import type { Metadata } from 'next'

import AboutPageView from '@/view/route/about/pages/about.page'

export const metadata: Metadata = {
	title: 'Hieu.BuiMinh',
	description: `I'm Hieu A Frontend Developer Creating websites using React.`,
}

function AboutPage() {
	return <AboutPageView />
}

export default AboutPage

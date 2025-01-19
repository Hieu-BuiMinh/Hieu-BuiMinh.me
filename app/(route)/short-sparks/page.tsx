import type { Metadata } from 'next'

import ShortSparksPageView from '@/view/route/short-sparks/pages/short-sparks.page'

export const metadata: Metadata = {
	title: 'Short Sparks',
	description: `Some videos that I really enjoy and find inspiring. This is is where I share these little bursts motivation, hoping they'll spark something in you too 🌟`,
}

function ShortSparksPage() {
	return <ShortSparksPageView />
}

export default ShortSparksPage

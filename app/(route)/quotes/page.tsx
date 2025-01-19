import type { Metadata } from 'next'

import QuotesPageview from '@/view/route/quotes/pages/quotes.page'

export const metadata: Metadata = {
	title: 'Quotes',
	description: `Welcome to the Quotes page. This is a space where I share some of the quotes that have inspired me along the way. I hope these words can offer a bit of reflection, encouragement, and positivity, just as they've done for me.`,
}

function ShortSparksPage() {
	return <QuotesPageview />
}

export default ShortSparksPage

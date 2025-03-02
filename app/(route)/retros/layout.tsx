import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Retrospective',
	description: `Every year, I share my progress both in career and personal life. Here's how it's going`,
}

function RetrosLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto max-w-screen-xl p-3 md:px-10 md:py-6">{children}</div>
}

export default RetrosLayout

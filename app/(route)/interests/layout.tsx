import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Interests',
	description: `A place to explore the things I'm passionate about and love sharing ❤️`,
}

function InterestsLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto min-h-screen max-w-screen-lg p-3 md:px-10 md:py-6">{children}</div>
}

export default InterestsLayout

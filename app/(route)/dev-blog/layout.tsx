import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Blog',
	description: `Explore my site to learn more about my Journey and discover some of the web development resources that have inspired me 😘`,
}

function DevBlogLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto max-w-screen-lg p-3 md:px-10 md:py-6">{children}</div>
}

export default DevBlogLayout

import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Projects',
	description: `The list of my projects. Everything was made with LOVE.`,
}

function ProjectsLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto max-w-screen-lg p-3 md:px-10 md:py-6">{children}</div>
}

export default ProjectsLayout

import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Docs',
	description: `Welcome to my collection of insights on ancient wisdom and philosophical concepts. Here, I delve into the timeless teachings of the Yi Jing (I Ching), the profound principles of Yin Yang, and other thought-provoking topics that explore the balance between opposites, the flow of energy, and the interconnectedness of all things 🌵`,
}

function DocLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto max-w-screen-2xl">{children}</div>
}

export default DocLayout

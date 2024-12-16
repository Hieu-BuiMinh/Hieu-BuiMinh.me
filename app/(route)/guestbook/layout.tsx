import type { Metadata } from 'next'
import React from 'react'

import { SITE_CONFIG } from '@/config/site'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Guestbook',
		description: 'Sign my guestbook and share your idea. You can tell me anything here!',
		authors: { name: SITE_CONFIG.author.name },
		openGraph: {
			title: 'Guestbook',
			description: 'Sign my guestbook and share your idea. You can tell me anything here!',
			type: 'article',
			images: [
				{
					url: SITE_CONFIG.og,
					width: 1200,
					height: 630,
					alt: 'Guestbook',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Guestbook',
			description: 'Sign my guestbook and share your idea. You can tell me anything here!',
			images: [SITE_CONFIG.og],
		},
	}
}

function GuestbookLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto min-h-screen max-w-screen-lg p-3 md:px-10 md:py-6">{children}</div>
}

export default GuestbookLayout

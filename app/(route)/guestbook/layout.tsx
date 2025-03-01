import type { Metadata } from 'next'
import Image from 'next/image'
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
	return (
		<>
			<Image
				width={1080}
				height={500}
				src="/assets/images/background/guessbook-header-blur-bg.png"
				alt="about-header-blur-bg"
				className="absolute left-1/2 top-0 h-1/2 w-full -translate-x-1/2 -translate-y-0 object-cover opacity-10"
			/>
			<div className="absolute left-1/2 top-0 h-1/2 w-full -translate-x-1/2 -translate-y-0 bg-gradient-to-t from-background to-transparent" />
			<div className="relative z-10 m-auto min-h-[50vh] max-w-screen-lg p-3 md:px-10 md:py-6">{children}</div>
		</>
	)
}

export default GuestbookLayout

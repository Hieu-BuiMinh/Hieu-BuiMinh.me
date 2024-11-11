import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

import AppProvider from '@/components/commons/providers/app-provider'
import SideHeader from '@/components/commons/side-header'
import { siteConfig } from '@/config/site'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	manifest: '/favicon/site.webmanifest',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		site: '@hieu.buiminh',
		siteId: '1152256803746377730',
		creator: '@hieu.buiminh',
		creatorId: '1152256803746377730', // get this from twitter
		images: [
			{
				url: '/assets/images/og.png',
				width: 1200,
				height: 630,
				alt: siteConfig.description,
			},
		],
	},
	keywords: siteConfig.siteKeywords,
	creator: 'Hieu.BuiMinh',
	openGraph: {
		url: siteConfig.url,
		type: 'website',
		title: siteConfig.name,
		siteName: siteConfig.name,
		description: siteConfig.description,
		locale: 'en-US',
		images: [
			{
				url: '/images/og.png',
				width: 1200,
				height: 630,
				alt: siteConfig.description,
				type: 'image/png',
			},
		],
	},
	icons: {
		icon: [
			{
				media: '(prefers-color-scheme: light)',
				url: '/assets/images/logo/logo-light.svg',
				href: '/assets/images/logo/logo-light.svg',
			},
			{
				media: '(prefers-color-scheme: dark)',
				url: '/assets/images/logo/logo-dark.svg',
				href: '/assets/images/logo/logo-dark.svg',
			},
		],
		shortcut: [
			{
				media: '(prefers-color-scheme: light)',
				url: '/assets/images/logo/logo-light.svg',
				href: '/assets/images/logo/logo-light.svg',
			},
			{
				media: '(prefers-color-scheme: dark)',
				url: '/assets/images/logo/logo-dark.svg',
				href: '/assets/images/logo/logo-dark.svg',
			},
		],
		apple: [
			{
				url: '/favicon/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
			},
		],
		other: [
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				url: '/assets/favicon/favicon-16x16.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				url: '/assets/favicon/favicon-32x32.png',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AppProvider>
					<SideHeader />
					{children}
				</AppProvider>
			</body>
		</html>
	)
}

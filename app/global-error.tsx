'use client'
import localFont from 'next/font/local'

import { Button } from '@/components/ui/button'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<html className="scroll-smooth" suppressHydrationWarning lang="en">
			<body suppressHydrationWarning className={`${geistSans.variable} ${geistSans.className} antialiased`}>
				<div className="h-content space-y-4 px-2 py-8">
					<h1 className="text-2xl font-bold">Something went wrong!</h1>
					<Button onClick={reset} type="button">
						Try again
					</Button>
					<p className="break-words rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">{error.message}</p>
				</div>
			</body>
		</html>
	)
}

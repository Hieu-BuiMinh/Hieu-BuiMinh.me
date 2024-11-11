'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function MainNav() {
	const pathname = usePathname()
	return (
		<nav className="flex items-center space-x-4 lg:space-x-6">
			<Link href="/" className="mr-6 flex items-center space-x-2">
				<Image
					className="hidden dark:block"
					src="/assets/images/logo/logo-dark.svg"
					alt="logo"
					width={35}
					height={35}
				/>
				<Image
					className="block dark:hidden"
					src="/assets/images/logo/logo-light.svg"
					alt="logo"
					width={35}
					height={35}
				/>
				<span className="font-bold">{siteConfig.name}</span>
			</Link>
			<Link
				href="/blog"
				className={cn(
					'hidden text-sm font-medium transition-colors hover:text-primary sm:inline-block',
					pathname === '/blog' ? 'text-foreground' : 'text-foreground/60'
				)}
			>
				Blog
			</Link>
			<Link
				href="/about"
				className={cn(
					'hidden text-sm font-medium transition-colors hover:text-primary sm:inline-block',
					pathname === '/about' ? 'text-foreground' : 'text-foreground/60'
				)}
			>
				About
			</Link>
		</nav>
	)
}

import { Facebook, Github } from 'lucide-react'
import Link from 'next/link'

import { MainNav } from '@/components/commons/main-nav'
import { MobileNav } from '@/components/commons/mobile-nav'
import { ModeToggle } from '@/components/commons/mode-toggle'
import { siteConfig } from '@/config/site'

function SideHeader() {
	return (
		<header className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
			<div className="container m-auto flex h-14 items-center justify-between">
				<MainNav />
				<div className="flex items-center justify-end space-x-2">
					<nav className="flex items-center">
						<Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
							<Github size={20} className="hidden w-10 px-0 sm:inline-flex" />
						</Link>
						<Link href={siteConfig.links.facebook} target="_blank" rel="noreferrer">
							<Facebook size={20} className="hidden w-10 px-0 sm:inline-flex" />
						</Link>
						<ModeToggle />
						<MobileNav />
					</nav>
				</div>
			</div>
		</header>
	)
}

export default SideHeader

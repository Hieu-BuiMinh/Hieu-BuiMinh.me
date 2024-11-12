import Link from 'next/link'

import { Icons } from '@/components/commons/icons'
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
					<nav className="flex items-center gap-2">
						<Link
							className="hidden px-0 sm:inline-flex"
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							aria-label="github"
						>
							<Icons.gitHub className="size-6" />
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

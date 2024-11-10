import Link from 'next/link'

import { Icons } from '@/components/commons/icons'
import { MainNav } from '@/components/commons/main-nav'
import { MobileNav } from '@/components/commons/mobile-nav'
import { ModeToggle } from '@/components/commons/mode-toggle'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

function SideHeader() {
	return (
		<header className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<MainNav />
				<div className="flex flex-1 items-center justify-end space-x-2">
					<nav className="flex items-center">
						<Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
							<div
								className={cn(buttonVariants({ variant: 'ghost' }), 'hidden w-10 px-0 sm:inline-flex')}
							>
								<Icons.gitHub className="size-4" />
								<span className="sr-only">GitHub</span>
							</div>
						</Link>
						<Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
							<div
								className={cn(buttonVariants({ variant: 'ghost' }), 'hidden w-10 px-0 sm:inline-flex')}
							>
								<Icons.twitter className="size-4" />
								<span className="sr-only">Twitter</span>
							</div>
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

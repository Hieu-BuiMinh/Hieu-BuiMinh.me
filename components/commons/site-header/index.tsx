import CommandMenu from '@/components/commons/command-menu'
import { MainNav, MobileNav } from '@/components/commons/main-nav'
import { ModeToggle } from '@/components/commons/mode-toggle'

function SiteHeader() {
	return (
		<header className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
			<div className="container m-auto flex h-14 items-center justify-between">
				<MainNav />
				<div className="flex items-center justify-end space-x-2">
					<nav className="flex items-center gap-2">
						<ModeToggle />
						<MobileNav />
						<CommandMenu />
					</nav>
				</div>
			</div>
		</header>
	)
}

export default SiteHeader
import { ThemeToggle } from '@/components/commons/buttons/theme-toggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { VeliteMetaItem } from '@/velite.config'
import AuthItem from '@/view/components/doc-content/sidebar/auth.item'
import RootToggle from '@/view/components/doc-content/sidebar/root-toggle'
import TableOfContent from '@/view/components/doc-content/table-of-content'

interface IDocSidebarProps {
	sidebarTree: VeliteMetaItem[]
}

async function DocSidebar({ sidebarTree }: IDocSidebarProps) {
	return (
		<aside className="sticky top-[calc(3.5rem+1px)] hidden h-[calc(100vh-3.5rem)] w-full border-r border-dashed pt-2 md:block">
			<div className="flex size-full flex-col gap-5">
				<AuthItem />

				<RootToggle />

				<ScrollArea className="w-full flex-1 rounded-md px-1">
					<TableOfContent sidebarTree={sidebarTree} />
				</ScrollArea>

				<div className="flex flex-row items-center border-t px-4 pb-2 pt-1 md:px-3">
					<ThemeToggle />
				</div>
			</div>
		</aside>
	)
}

export default DocSidebar

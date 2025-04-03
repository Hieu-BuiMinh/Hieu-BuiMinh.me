import type { DocPost } from '@/.velite'
import { docs } from '@/.velite'
import { ThemeToggle } from '@/components/commons/buttons/theme-toggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { VeliteOrder } from '@/velite.config'
import AuthItem from '@/view/components/doc-content/sidebar/auth.item'
import RootToggle from '@/view/components/doc-content/sidebar/root-toggle'
import TableOfContent from '@/view/components/doc-content/table-of-content'

interface IDocSidebarProps {
	sidebarOrder: VeliteOrder[]
}

function getSidebarTreeFromOrder(sidebarOrder: VeliteOrder[]) {
	const tree: DocPost[] = []
	sidebarOrder.forEach((element) => {
		const post = docs.find((p) => p.id === element.id)
		if (element.children) {
			const children = getSidebarTreeFromOrder(element.children)
			if (post) {
				tree.push({ ...post, children })
			}
		} else {
			if (post) {
				tree.push(post)
			}
		}
	})
	return tree
}

async function DocSidebar({ sidebarOrder }: IDocSidebarProps) {
	const mappedTreeView = getSidebarTreeFromOrder(sidebarOrder)

	return (
		<aside className="sticky top-[calc(3.5rem+1px)] hidden h-[calc(100vh-3.5rem)] w-full border-r border-dashed pt-2 md:block">
			<div className="flex size-full flex-col gap-5">
				<AuthItem />

				<RootToggle />

				<ScrollArea className="w-full flex-1 rounded-md px-1">
					<TableOfContent sidebarTree={mappedTreeView} />
				</ScrollArea>

				<div className="flex flex-row items-center border-t px-4 pb-2 pt-1 md:px-3">
					<ThemeToggle />
				</div>
			</div>
		</aside>
	)
}

export default DocSidebar

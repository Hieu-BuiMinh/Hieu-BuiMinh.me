import type { DocPost } from '@/.velite'
import { ScrollArea } from '@/components/ui/scroll-area'

interface IDocSidebarProps {
	post: DocPost
}

function DocSidebar({ post }: IDocSidebarProps) {
	console.log(post)

	return (
		<aside className="sticky top-[calc(3.5rem)] hidden h-[calc(100vh-3.5rem)] w-full md:block">
			<div className="flex size-full flex-col gap-2 border">
				header
				<ScrollArea className="w-full flex-1 rounded-md border"></ScrollArea>
			</div>
		</aside>
	)
}

export default DocSidebar

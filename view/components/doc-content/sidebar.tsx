import Link from 'next/link'
import { notFound } from 'next/navigation'

import type { DocPost } from '@/.velite'
import { ScrollArea } from '@/components/ui/scroll-area'
import { docPostsHierarchy, findAllPostInDocsBySinglePost } from '@/lib/content/docs'
import TableOfContent from '@/view/components/doc-content/table-of-content'

interface IDocSidebarProps {
	post: DocPost
}

function DocSidebar({ post }: IDocSidebarProps) {
	const allDocByPost = findAllPostInDocsBySinglePost(post)

	if (!allDocByPost) {
		return notFound()
	}

	// const tableOfContent = docPostsHierarchy(allDocByPost)

	return (
		<aside className="sticky top-[calc(3.5rem+1px)] hidden h-[calc(100vh-3.5rem)] w-full border-r border-dashed pt-2 md:block">
			<div className="flex size-full flex-col gap-2">
				<Link href="/" className="flex items-center gap-2 px-4">
					<span className="size-3 rounded-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#fff]  to-[#333]" />
					<span className="text-sm font-bold">Hieu.docs</span>
				</Link>
				<ScrollArea className="w-full flex-1 rounded-md px-4">
					<TableOfContent />
				</ScrollArea>
			</div>
		</aside>
	)
}

export default DocSidebar

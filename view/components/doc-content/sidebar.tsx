import type { DocPost } from '@/.velite'

interface IDocSidebarProps {
	post: DocPost
}

function DocSidebar({ post }: IDocSidebarProps) {
	console.log(post)

	return (
		// <div className="relative hidden h-full border border-red-500 md:block">
		// 	<aside className="sticky top-0 h-[calc(100%-385.41px)] w-full border border-white"></aside>
		// </div>
		<aside className="sticky top-0 h-[calc(100%-385.41px)] w-full border border-white"></aside>
	)
}

export default DocSidebar

//border-e bg-background/80 p-3 text-sm md:fixed md:w-[220px] xl:w-[240px]

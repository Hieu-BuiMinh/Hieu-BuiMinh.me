import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { type DocPost, docs } from '@/.velite'
import type { VeliteOrder } from '@/velite.config'

interface IFooterNavigatorProps {
	post: DocPost
	className?: string
}

function flattenData(rootOrder: VeliteOrder[]) {
	let flatedIds: { id: string }[] = []

	rootOrder?.forEach((item) => {
		flatedIds.push({ id: item.id })
		if (item.children && item.children.length > 0) {
			flatedIds = flatedIds.concat(flattenData(item.children))
		}
	})

	const docsListByIds = flatedIds.map((item) => {
		return docs.find((p) => p.id === item.id)
	})

	return docsListByIds
}

function FooterNavigator({ post }: IFooterNavigatorProps) {
	const isRootPost = post.type === 'ROOT'

	const rootPost = isRootPost ? post : docs.find((p) => p.id === post.root)
	const flatedRootOrder = flattenData(rootPost.order)

	const currentPostIndex = flatedRootOrder.findIndex((p) => p.id === post.id)

	const nextPost = flatedRootOrder[currentPostIndex + 1]
	const prevPost = flatedRootOrder[currentPostIndex - 1]

	return (
		<div className="not-prose mt-10 flex gap-4">
			{prevPost && (
				<Link
					className="col-start-2 flex w-full flex-1 flex-col gap-2 rounded-lg border bg-card p-4 text-start text-sm transition-colors hover:bg-background/10 hover:text-foreground"
					href={`/${prevPost.slug}`}
				>
					<div className="text-fd-muted-foreground inline-flex flex-row items-center gap-0.5">
						<ChevronLeft size={15} />
						<p>Previous</p>
					</div>
					<p className="font-medium">{prevPost.title}</p>
				</Link>
			)}
			{nextPost && (
				<Link
					className="col-start-2 flex w-full flex-1 flex-col gap-2 rounded-lg border bg-card p-4 text-end text-sm transition-colors hover:bg-background/80 hover:text-foreground"
					href={`/${nextPost.slug}`}
				>
					<div className="text-fd-muted-foreground inline-flex flex-row-reverse items-center gap-0.5">
						<ChevronRight size={15} />
						<p>Next</p>
					</div>
					<p className="font-medium">{nextPost.title}</p>
				</Link>
			)}
		</div>
	)
}

export default FooterNavigator

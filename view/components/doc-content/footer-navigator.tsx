import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { type DocPost, docs } from '@/.velite'
import { sortPostsByDate } from '@/lib/content/posts'
import type { VeliteMetaItem } from '@/velite.config'

interface IFooterNavigatorProps {
	post: DocPost
	className?: string
}

function flattenData(rootMeta: VeliteMetaItem[]) {
	let result: { title: string; url?: string; slug: string; type: string; id?: string }[] = []

	rootMeta.forEach((item) => {
		result.push({ title: item.title, url: item.url, slug: item.slug, type: item.type, id: item?.id })
		if (item.children && item.children.length > 0) {
			result = result.concat(flattenData(item.children))
		}
	})

	return result
}

function FooterNavigator({ post }: IFooterNavigatorProps) {
	const isRootPost = post.type === 'ROOT'

	const rootPost = isRootPost ? post : docs.find((p) => p.id === post.root)
	const flatedRootMeta = flattenData(rootPost.meta)

	const currentPostIndex = flatedRootMeta.findIndex((p) => p.id === post.id)

	const nextPost = flatedRootMeta[currentPostIndex + 1]
	const prevPost = flatedRootMeta[currentPostIndex - 1]

	return (
		<div className="not-prose mt-10 flex gap-4">
			{prevPost && (
				<Link
					className="col-start-2 flex w-full flex-1 flex-col gap-2 rounded-lg border bg-card p-4 text-start text-sm transition-colors hover:bg-background/10 hover:text-foreground"
					href={`/${prevPost.url}`}
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
					href={`/${nextPost.url}`}
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

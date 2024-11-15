'use client'

import Link from 'next/link'
import { useMemo } from 'react'

import type { DevBlog } from '@/.velite'

type Header = {
	title: string
	url: string
	items?: Header[]
}

function TableOfContent({ post }: { post: DevBlog }) {
	const TOC = post.toc

	const flatTocArray = useMemo(() => {
		const flat: { url: string; title: string; level: number }[] = []
		const flatten = (headers: Header[], level: number = 0) => {
			headers.forEach((header) => {
				flat.push({ url: header.url, title: header.title, level })
				if (header.items && header.items.length > 0) {
					flatten(header.items, level + 1)
				}
			})
		}
		flatten(TOC)
		return flat
	}, [TOC])

	if (flatTocArray.length === 0) {
		return <p className="text-muted-foreground">No table of contents available.</p>
	}

	return (
		<nav aria-label="Table of Contents" className="relative">
			<p className="text-md font-bold text-foreground">On this page</p>
			{flatTocArray.map((toc, index) => (
				<div key={`${toc.title}-${index}`} className={`pt-5`} style={{ paddingLeft: toc.level * 15 }}>
					<Link
						className="line-clamp-1 text-sm leading-[1.2] text-muted-foreground no-underline transition-colors hover:text-foreground"
						href={toc.url}
					>
						{toc.title}
					</Link>
				</div>
			))}
		</nav>
	)
}

export default TableOfContent

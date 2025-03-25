'use client'

import { ListTree, Text } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import type { DevBlogPost, DocPost, InterestPost, ProjectPost } from '@/.velite'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useScrollspy } from '@/hooks/use-scrollspy'
import { cn } from '@/lib/utils'

type Header = {
	title: string
	url: string
	items?: Header[]
}

type TTOC = {
	title: string
	url: string
	items: TTOC[]
}

function MobileTableOfContent({ post }: { post: DevBlogPost | DocPost | InterestPost | ProjectPost }) {
	const TOC = post.toc

	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 1024px)')

	function extractUrls(Toc?: TTOC[]): string[] {
		const urls: string[] = []

		function traverse(items?: TTOC[]) {
			items?.forEach((item) => {
				urls.push(item.url.slice(1)) // remove the "#" from the URL
				if (item.items && item.items.length > 0) {
					traverse(item.items)
				}
			})
		}

		traverse(Toc)
		return urls
	}

	const activeId = useScrollspy(extractUrls(TOC), { rootMargin: '0% 0% -80% 0%' })

	const flatTocArray = useMemo(() => {
		const flat: { url: string; title: string; level: number }[] = []
		const flatten = (headers: Header[], level: number = 0) => {
			headers?.forEach((header) => {
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
		return <>{isDesktop ? <p className="text-muted-foreground">No table of contents available.</p> : null}</>
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button size="icon" className="opacity-1 flex bg-transparent backdrop-blur-[2px]" variant="outline">
					<ListTree size={30} />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="max-h-[90vh]">
				<DrawerHeader className="pb-0 text-left">
					<DrawerTitle>
						<p className="flex gap-1 p-1 pb-0 text-sm font-bold text-muted-foreground">
							<Text size={20} />
							On this page
						</p>
					</DrawerTitle>
				</DrawerHeader>

				<ScrollArea className="flex max-h-[calc(100vh)] w-full flex-col overflow-y-auto p-5">
					{flatTocArray.map((toc, index) => (
						<div
							key={`${toc.title}-${index}`}
							className={`pt-5 first:pt-0`}
							style={{ paddingLeft: toc.level * 15 }}
						>
							<Link
								className={cn(
									'line-clamp-1 text-sm leading-[1.2] text-muted-foreground no-underline transition-colors hover:text-foreground',
									toc.url.slice(1) === activeId && 'font-semibold text-foreground'
								)}
								href={toc.url}
							>
								{toc.title}
							</Link>
						</div>
					))}
					<ScrollBar orientation="vertical" className="sm:hidden" />
					<ScrollBar orientation="horizontal" className="sm:hidden" />
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	)
}

export default MobileTableOfContent

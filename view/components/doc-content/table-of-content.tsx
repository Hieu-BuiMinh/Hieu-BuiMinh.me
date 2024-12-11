'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { memo, useState } from 'react'

import type { DocPost } from '@/.velite'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { docPostsHierarchy } from '@/lib/content/docs'
import { cn } from '@/lib/utils'

type TreeItem = {
	id: string
	title: React.ReactNode
	href?: string
	children?: TreeItem[]
}

interface ITableOfContent {
	className?: string
	docsList: DocPost[]
}

function TableOfContent({ className, docsList }: ITableOfContent) {
	console.log(docsList)
	const params = useParams<{ slug: string[] }>()

	const postSlugAsParams = params?.slug?.join('/')

	const tableOfContent = docPostsHierarchy(docsList, postSlugAsParams)

	return (
		<div className={cn('w-full', className)}>
			{tableOfContent?.map((item) => <TreeItem key={item.id} item={item} />)}
		</div>
	)
}

export default memo(TableOfContent)

function TreeItem({ item }: { item: TreeItem }) {
	const hasChildren = item.children && item.children.length > 0

	if (hasChildren) {
		return (
			<Accordion type="single" collapsible>
				<AccordionItem value={item.id} className="border-none">
					<AccordionTrigger className="w-full rounded px-2 py-1 pe-2.5 text-muted-foreground transition-colors duration-100 [overflow-wrap:anywhere] hover:bg-accent/50 hover:text-accent-foreground/80 hover:no-underline hover:transition-none">
						<Link
							href={`/${item.href}` || ''}
							className={cn('flex w-full items-center text-sm font-medium')}
						>
							{item.title}
						</Link>
					</AccordionTrigger>
					<AccordionContent className="ms-2 mt-2 pb-2">
						<div className="ml-1 border-l pl-2">
							{item.children?.map((item) => {
								return <TreeItem item={item} key={item.id} />
							})}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		)
	}

	return (
		<Link
			href={`/${item.href}` || ''}
			className={cn(
				'block w-full rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-100 [overflow-wrap:anywhere] hover:bg-accent/50 hover:text-accent-foreground md:px-2 md:py-1.5'
			)}
		>
			{item.title}
		</Link>
	)
}

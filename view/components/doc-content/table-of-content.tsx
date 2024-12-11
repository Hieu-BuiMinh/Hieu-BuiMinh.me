'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import { docs } from '@/.velite'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type TreeItem = {
	id: string
	title: React.ReactNode
	href?: string
	active?: boolean
	children?: TreeItem[]
}

interface ITableOfContent {
	data?: TreeItem[]
	className?: string
}

function TableOfContent({ data, className }: ITableOfContent) {
	return <div className={cn('w-full', className)}>{data?.map((item) => <TreeItem key={item.id} item={item} />)}</div>
}

export default TableOfContent

function TreeItem({ item }: { item: TreeItem }) {
	const [isOpen, setIsOpen] = useState(item.active)
	const hasChildren = item.children && item.children.length > 0

	if (hasChildren) {
		return (
			<Accordion
				value={isOpen ? item.id : ''}
				onValueChange={(value) => setIsOpen(value === item.id)}
				type="single"
				collapsible
			>
				<AccordionItem value={item.id} className="border-none">
					<AccordionTrigger className="py-1 hover:no-underline">
						<Link href={`/${item.href}` || ''} className="flex w-full items-center">
							<span
								className={cn('text-sm font-medium', {
									'text-green-500 dark:text-green-400 font-bold': item.active,
								})}
							>
								{item.title}
							</span>
						</Link>
					</AccordionTrigger>
					<AccordionContent className="pb-2">
						<div className="ml-1 border-l pl-2">
							<TableOfContent data={item.children || []} />
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		)
	}

	return (
		<Link
			href={`/${item.href}` || ''}
			className={cn('block w-full border text-sm font-medium', {
				'text-green-500 dark:text-green-400 font-bold': item.active,
			})}
		>
			{item.title}
		</Link>
	)
}

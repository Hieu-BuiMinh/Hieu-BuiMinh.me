'use client'

import { BookMarked } from 'lucide-react'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React, { memo, useEffect, useState } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import type { VeliteMetaItem } from '@/velite.config'

type TreeItem = {
	id: string
	title: React.ReactNode
	type?: string
	url?: string
	children?: TreeItem[]
}

interface ITableOfContent {
	className?: string
	sidebarTree: VeliteMetaItem[]
}

function TableOfContent({ className, sidebarTree }: ITableOfContent) {
	return (
		<div className={cn('flex w-full flex-col', className)}>
			{sidebarTree?.map((item) => <TreeItem key={item.id} item={item} />)}
		</div>
	)
}

export default memo(TableOfContent)

function TreeItem({ item }: { item: VeliteMetaItem }) {
	const path = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const isActive = `/${item.url}` === path
	const hasChildren = item.children && item.children.length > 0

	const handleRedirect = (url: string) => {
		// setIsOpen((prev) => !prev)
		redirect(url)
	}

	const shouldOpen = ({ item }: { item: VeliteMetaItem }) => {
		if (item.children && item.children.length > 0) {
			if (`/${item.url}` === path) {
				setIsOpen(true)
				return
			}
			item.children.map((child) => {
				shouldOpen({ item: child })
			})
		} else if (`/${item.url}` === path) {
			setIsOpen(true)
			return
		}
	}

	useEffect(() => {
		shouldOpen({ item })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (hasChildren) {
		return (
			<Accordion
				value={isOpen ? item.slug : ''}
				onClick={() => {
					setIsOpen((prev) => !prev)
				}}
				type="single"
				collapsible
			>
				<AccordionItem value={item.slug || ''} className="mt-1 border-none">
					<AccordionTrigger
						onClick={() => {
							// eslint-disable-next-line @typescript-eslint/no-unused-expressions
							!!item.url && handleRedirect(`/${item.url}`)
						}}
						className={cn(
							'rounded px-2 py-1 text-muted-foreground transition-colors duration-100 [overflow-wrap:anywhere] hover:bg-primary/10 hover:text-accent-foreground/80 hover:no-underline hover:transition-none',
							isActive && 'bg-primary/10 font-semibold text-primary dark:text-green-400'
						)}
					>
						{item.url ? (
							<Link
								href={`/${item.url}` || ''}
								className={cn('flex min-w-[1/2] items-center gap-2 text-sm font-medium')}
							>
								{item.type === 'ROOT' && <BookMarked size={16} />}
								{item.title}
							</Link>
						) : (
							<div className={cn('flex min-w-[1/2] items-center gap-2 text-sm font-medium')}>
								{item.type === 'ROOT' && <BookMarked size={16} />}
								{item.title}
							</div>
						)}
					</AccordionTrigger>
					<AccordionContent
						onClick={(event) => {
							event.stopPropagation()
						}}
						className="pb-0"
					>
						<div className="ml-2.5 border-l pl-2 pt-2">
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
		<>
			{item.url ? (
				<Link
					href={`/${item.url}` || ''}
					className={cn(
						'mb-2 flex w-full items-center gap-2 rounded px-2 py-1 text-sm font-medium text-muted-foreground transition-colors duration-100 [overflow-wrap:anywhere] hover:bg-primary/10 hover:text-accent-foreground',
						isActive && 'bg-primary/10 font-semibold text-primary dark:text-green-400'
					)}
				>
					{item.type === 'ROOT' && <BookMarked size={16} />}
					{item.title}
				</Link>
			) : (
				<div
					className={cn(
						'mb-2 flex w-full items-center gap-2 rounded px-2 py-1 text-sm font-medium text-muted-foreground transition-colors duration-100 [overflow-wrap:anywhere] hover:bg-primary/10 hover:text-accent-foreground',
						isActive && 'bg-primary/10 font-semibold text-primary dark:text-green-400'
					)}
				>
					{item.type === 'ROOT' && <BookMarked size={16} />}
					{item.title}
				</div>
			)}
		</>
	)
}

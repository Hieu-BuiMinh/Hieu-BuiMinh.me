'use client'

import { Folder, FolderOpen } from 'lucide-react'
import * as React from 'react'

import { LangIcons } from '@/components/commons/icons/lang-icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type TreeItem = {
	id: string
	name: string
	active?: boolean
	children?: TreeItem[]
}

export type TreeViewProps = {
	data: TreeItem[]
	expandAll: boolean
	defaultExpandIds?: string[]
	className?: string
}

function shouldExpand(item: TreeItem, defaultExpandIds?: string[]): boolean {
	if (defaultExpandIds?.includes(item.id)) return true
	return item.children?.some((child) => shouldExpand(child, defaultExpandIds)) || false
}

export default function TreeView({ data, expandAll, defaultExpandIds, className }: TreeViewProps) {
	return (
		<div className={className}>
			{data?.map((item) => (
				<TreeItem
					key={item.id}
					item={item}
					expandAll={expandAll}
					defaultExpandIds={defaultExpandIds || []}
					shouldExpandDefault={shouldExpand(item, defaultExpandIds)}
				/>
			))}
		</div>
	)
}

function TreeItem({
	item,
	expandAll,
	defaultExpandIds,
	shouldExpandDefault,
}: {
	item: TreeItem
	expandAll: boolean
	defaultExpandIds: string[]
	shouldExpandDefault: boolean
}) {
	const [isOpen, setIsOpen] = React.useState(expandAll || shouldExpandDefault)
	const hasChildren = item.children && item.children.length > 0

	React.useEffect(() => {
		setIsOpen(expandAll || shouldExpandDefault)
	}, [expandAll, shouldExpandDefault])

	if (hasChildren) {
		return (
			<Accordion
				type="single"
				collapsible
				value={isOpen ? item.id : ''}
				onValueChange={(value) => setIsOpen(value === item.id)}
				className="not-prose border-none"
			>
				<AccordionItem value={item.id} className="border-none">
					<AccordionTrigger className="py-1 hover:no-underline">
						<div className="flex items-center">
							{isOpen ? (
								<FolderOpen className="mr-2 size-4 shrink-0" />
							) : (
								<Folder className="mr-2 size-4 shrink-0" />
							)}
							<span
								className={cn('text-sm font-medium', {
									'text-green-500 dark:text-green-400 font-bold': item.active,
								})}
							>
								{item.name}
							</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pb-1">
						<div className="ml-1 border-l pl-2">
							<TreeView
								data={item.children || []}
								expandAll={expandAll}
								defaultExpandIds={defaultExpandIds}
							/>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		)
	}

	return (
		<div className="flex items-center py-1">
			<LangIcons fileName={item.name} className="mr-2 size-4 shrink-0" />
			<span
				className={cn('text-sm font-medium', {
					'text-green-500 dark:text-green-400 font-bold': item.active,
				})}
			>
				{item.name}
			</span>
		</div>
	)
}

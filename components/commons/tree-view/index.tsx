'use client'

import { Folder, FolderOpen } from 'lucide-react'
import * as React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getIconByFilename } from '@/lib/get-icon-by-filename'

type TreeItem = {
	id: string
	name: string
	children?: TreeItem[]
}

export type TreeViewProps = {
	data: TreeItem[]
	dir?: 'rtl' | 'ltr'
	expandAll: boolean
	defaultExpandIds: string[]
}

function shouldExpand(item: TreeItem, defaultExpandIds: string[]): boolean {
	if (defaultExpandIds.includes(item.id)) return true
	return item.children?.some((child) => shouldExpand(child, defaultExpandIds)) || false
}

export default function TreeView({ data, expandAll, defaultExpandIds }: TreeViewProps) {
	return (
		<>
			{data?.map((item) => (
				<TreeItem
					key={item.id}
					item={item}
					expandAll={expandAll}
					defaultExpandIds={defaultExpandIds}
					shouldExpandDefault={shouldExpand(item, defaultExpandIds)}
				/>
			))}
		</>
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
	const Icon = getIconByFilename(item.name)

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
				className="border-none"
			>
				<AccordionItem value={item.id} className="border-none">
					<AccordionTrigger className="py-1 hover:no-underline">
						<div className="flex items-center">
							{isOpen ? (
								<FolderOpen className="mr-2 size-4 shrink-0" />
							) : (
								<Folder className="mr-2 size-4 shrink-0" />
							)}
							<span className="text-sm font-medium">{item.name}</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
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
			<Icon className="mr-2 size-4 shrink-0" />
			<span className="text-sm">{item.name}</span>
		</div>
	)
}

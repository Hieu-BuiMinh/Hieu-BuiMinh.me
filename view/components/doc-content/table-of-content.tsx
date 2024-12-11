import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type TreeItem = {
	id: string
	active?: boolean
	href?: string
	children?: TreeItem[]
}

interface ITableOfContent {
	data?: TreeItem[]
}

function TableOfContent({ data }: ITableOfContent) {
	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem className="border-none " value="item-1">
				<AccordionTrigger className="p-1">Is it accessible?</AccordionTrigger>
				<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export default TableOfContent

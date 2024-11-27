import React from 'react'

import { cn } from '@/lib/utils'

interface IShowcaseGridProps {
	data?: {
		description: React.ReactNode | string
		content: React.ReactNode | string
		colSpan?: number
		rowSpan?: number
	}[]
}

function ShowcaseGrid({ data }: IShowcaseGridProps) {
	const boxStyle =
		'transition-transform bg-muted border-2 rounded-md p-1 flex flex-col items-center justify-center md:hover:scale-105'

	return (
		<div className="not-prose my-10 grid auto-rows-[250px] gap-4 md:auto-rows-[200px] lg:grid-cols-4">
			{data?.map((item, i) => (
				<div
					key={i}
					className={cn(boxStyle, {
						[`md:col-span-${item.colSpan || 1}`]: item.colSpan,
						[`md:row-span-${item.rowSpan || 1}`]: item.rowSpan,
					})}
				>
					<div className="size-full overflow-hidden rounded-md">{item.content}</div>
				</div>
			))}
		</div>
	)
}

export default ShowcaseGrid

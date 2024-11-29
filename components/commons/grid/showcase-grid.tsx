import React from 'react'

import { cn } from '@/lib/utils'

interface IShowcaseGridProps {
	data?: {
		content: React.ReactNode | string
		colSpan?: number
		rowSpan?: number
		className?: string
	}[]
}

function ShowcaseGrid({ data }: IShowcaseGridProps) {
	return (
		<div className="not-prose my-10 grid auto-rows-[250px] grid-cols-4 gap-4 md:auto-rows-[200px]">
			{data?.map((item, i) => {
				return (
					<div
						key={i}
						className={cn(
							'col-span-4 row-span-1 flex flex-col items-center justify-center rounded-md border-2 bg-muted p-1 transition-transform md:col-span-2 md:hover:scale-105 ',
							item.className
						)}
					>
						{item.content}
					</div>
				)
			})}
		</div>
	)
}

export default ShowcaseGrid

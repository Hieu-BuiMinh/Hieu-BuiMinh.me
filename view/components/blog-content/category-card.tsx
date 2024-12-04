import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import BlurImage from '@/components/commons/image/blur-image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Category } from '@/view/components/blog-content/category-cards'

interface ICategoryCardProps {
	data: Category
}

function CategoryCard(props: ICategoryCardProps) {
	const { data } = props

	return (
		<Link href={data.href} className="group rounded-md border p-2 dark:border-none dark:p-0">
			<BlurImage
				src={data.cover || ''}
				className="h-[220px] rounded-md object-cover"
				width={1200}
				height={220}
				imageClassName="transition-transform group-hover:scale-105 object-cover"
				alt={data.title}
			/>
			<div className="flex flex-col py-4">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<h3 className="font-title text-md line-clamp-1 text-left font-bold">{data.title}</h3>
						</TooltipTrigger>
						<TooltipContent className="max-w-[250px] bg-secondary text-foreground shadow-md">
							<p>{data.title}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<p className="mt-2 line-clamp-2 text-left text-muted-foreground">{data.description}</p>
						</TooltipTrigger>
						<TooltipContent className="max-w-[250px] bg-secondary text-foreground shadow-md">
							<p>{data.description}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className="flex items-center justify-end text-xs text-zinc-500">
				<span className="flex items-center justify-center gap-1">
					Explore <ArrowRight size={10} />
				</span>
			</div>
		</Link>
	)
}

export default CategoryCard

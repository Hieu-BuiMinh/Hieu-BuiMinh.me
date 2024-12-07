import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import BlurImage from '@/components/commons/image/blur-image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { Category } from '@/view/components/blog-content/category-cards'

interface ICategoryCardProps {
	data: Category
	className?: string
}

function CategoryCard(props: ICategoryCardProps) {
	const { data, className } = props

	return (
		<Link
			href={data.href || ''}
			className={cn(
				"bg group flex min-h-[250px] flex-col justify-between overflow-hidden rounded-lg border bg-[url('/assets/images/background/landing-noise.png')] bg-repeat p-3",
				className
			)}
		>
			<BlurImage
				src={data.cover}
				className="h-[250px] rounded-md object-cover"
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
							<p className="mt-2 line-clamp-2 text-left text-muted-foreground transition-colors group-hover:text-foreground">
								{data.description}
							</p>
						</TooltipTrigger>
						<TooltipContent className="max-w-[250px] bg-secondary text-foreground shadow-md">
							<p>{data.description}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className="flex items-center justify-end text-xs text-zinc-500 transition-all group-hover:text-foreground">
				<span className="flex items-center justify-center gap-1 rounded-full border px-2 py-1 group-hover:border-foreground">
					Explore <ArrowRight size={10} />
				</span>
			</div>
		</Link>
	)
}

export default CategoryCard

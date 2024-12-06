import { CircleArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'

import BlurImage from '@/components/commons/image/blur-image'
import type { Category } from '@/view/components/blog-content/category-cards'

interface ICategoryCardV2Props {
	data?: Category
}

function CategoryCardV2(props: ICategoryCardV2Props) {
	const { data } = props

	return (
		<Link
			href={data?.href || ''}
			className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-lg border bg-gradient-to-tr bg from-cyan-400 to-sky-950 p-10 transition-all duration-500 hover:from-sky-950 hover:to-cyan-400"
		>
			<h2 className="text-3xl font-bold">Title</h2>
			<span>Description</span>

			<span className="flex items-center justify-start gap-3 text-xl text-background/90">
				<CircleArrowOutUpRight size={20} /> Explore
			</span>

			<BlurImage
				src={'/assets/images/folder-3d.png'}
				className="absolute -right-12 -top-12 h-[300px] -rotate-12 rounded-md object-cover"
				width={1200}
				height={220}
				imageClassName="transition-transform group-hover:scale-105 object-cover"
				alt={'data.title'}
				pulse={false}
			/>
		</Link>
	)
}

export default CategoryCardV2

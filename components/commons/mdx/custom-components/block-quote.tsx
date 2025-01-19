import { QuoteIcon } from 'lucide-react'
import React from 'react'

import BlurImage from '@/components/commons/image/blur-image'
import { cn } from '@/lib/utils'

interface IBlockQuote {
	data: {
		author?: {
			avatar?: string
			name?: string
			url?: string
		}
		quote?: string
		description?: string
	}
	className?: string
}

function BlockQuote({ data, className }: IBlockQuote) {
	return (
		<div
			className={cn(
				'not-prose relative flex flex-col gap-4 overflow-hidden rounded-md border p-2 pl-5 transition-all',
				// 'hover:shadow-[rgba(0,_0,_0,_0.4)_0px_2px_4px,_rgba(0,_0,_0,_0.3)_0px_7px_13px_-3px,_rgba(0,_0,_0,_0.2)_0px_-3px_0px_inset]',
				className
			)}
		>
			<QuoteIcon className="absolute bottom-4 right-4 text-muted-foreground" size={35} />

			<p className="text-sm text-gray-800 dark:text-white">{data.quote}</p>

			{data?.author && (
				<div className="flex items-center gap-3">
					<div className="rounded-full border border-green-600 bg-green-600/20 p-1">
						<BlurImage
							className="size-[35px] rounded-full"
							width={50}
							height={50}
							alt={data.author.avatar || ''}
							src={data.author.avatar || ''}
							unoptimized={false}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-sm font-semibold">{data.author.name}</p>
						{data.description && (
							<p className="text-xs italic text-muted-foreground">-{data.description}-</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default BlockQuote

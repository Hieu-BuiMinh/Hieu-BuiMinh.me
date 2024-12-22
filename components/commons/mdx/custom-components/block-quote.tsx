import { QuoteIcon } from 'lucide-react'
import React from 'react'

import BlurImage from '@/components/commons/image/blur-image'

interface IBlockQuote {
	data: {
		author?: {
			avatar?: string
			name?: string
			url?: string
		}
		quote?: string
	}
}

function BlockQuote({ data }: IBlockQuote) {
	return (
		<div className="not-prose relative my-5 flex flex-col gap-4 pl-5">
			<span className="absolute left-0 top-0 h-full w-1 rounded-md bg-green-600 dark:bg-green-400" />
			<QuoteIcon className="absolute bottom-4 right-4 text-muted-foreground" size={35} />

			<p className="text-gray-800 dark:text-white sm:text-base">
				<em>`{data.quote}`</em>
			</p>

			{data?.author && (
				<div className="flex items-center gap-3">
					<BlurImage
						className="size-[40px] rounded-full"
						width={50}
						height={50}
						alt={data.author.avatar || ''}
						src={data.author.avatar || ''}
					/>
					<p className="text-sm italic text-muted-foreground">-{data.author.name}-</p>
				</div>
			)}
		</div>
	)
}

export default BlockQuote

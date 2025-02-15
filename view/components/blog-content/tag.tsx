import { Hash } from 'lucide-react'
import Link from 'next/link'
import slug from 'slug'

import { cn } from '@/lib/utils'

interface TagProps {
	tag: string
	current?: boolean
	count?: number
}
export function Tag({ tag, current, count }: TagProps) {
	return (
		<Link
			className={cn('not-prose flex items-center gap-2 rounded border p-1 text-xs no-underline', {
				'bg-foreground dark:bg-green-400 text-muted': current,
			})}
			href={`/tags/${slug(tag)}`}
		>
			<Hash size={15} />
			<span className="flex gap-2">
				<span>{tag}</span>
				<span>{count ? `[${count}]` : null}</span>
			</span>
		</Link>
	)
}

import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function ProjectLink({ title, url = '' }: { title: string; url: string }) {
	return (
		<Link href={url} target="_blank" className={cn(buttonVariants(), 'group')}>
			{title}
			<SquareArrowOutUpRight className="ml-2 size-5 transition-transform group-hover:-rotate-12" />
		</Link>
	)
}

export default ProjectLink

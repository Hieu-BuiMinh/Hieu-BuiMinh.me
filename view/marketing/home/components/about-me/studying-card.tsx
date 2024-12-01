import { HeartIcon } from 'lucide-react'
import React from 'react'

import { SVGIcons } from '@/components/commons/icons/svg-icons'

function StudyingCard() {
	return (
		<div className="group flex size-full flex-col items-center justify-between gap-3 p-4 lg:p-6">
			<div className="flex w-full gap-2 text-xs text-foreground md:text-base">
				<HeartIcon size={20} />
				<span>Fav. Framework</span>
			</div>

			<div className="relative flex size-full items-center justify-center [@media(max-width:450px)]:py-8">
				<div className="absolute left-1/2 top-1/2 size-[90px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-foreground blur-md" />
				<SVGIcons.NextJS className="size-[80px] drop-shadow-sm" />
			</div>

			<span />
		</div>
	)
}

export default StudyingCard

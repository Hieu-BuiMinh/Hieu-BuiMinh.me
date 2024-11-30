import { HeartIcon } from 'lucide-react'
import React from 'react'

import { SVGIcons } from '@/components/commons/icons/svg-icons'

function StudyingCard() {
	return (
		<div className="group flex size-full flex-col items-center justify-between gap-3 p-4 lg:p-6">
			<div className="flex w-full gap-2 text-xs text-foreground/50 transition-all group-hover:text-foreground md:text-base">
				<HeartIcon size={20} />
				<span>Fav. Framework</span>
			</div>

			<div className="relative [@media(max-width:450px)]:py-8">
				<SVGIcons.NextJS className="size-[80px] drop-shadow-sm" />
				<div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-foreground opacity-50 blur-md transition"></div>
			</div>

			<span />
		</div>
	)
}

export default StudyingCard

import React from 'react'

import { Separator } from '@/components/ui/separator'

interface IPageTitleProps {
	title: string
	description: string
	animate?: boolean
}

function PageTitle({ description, title }: IPageTitleProps) {
	return (
		<div className="relative flex flex-col gap-5 pb-5">
			<h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
			<h2 className="text-muted-foreground">{description}</h2>
			<Separator className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 -translate-y-1/2" />
		</div>
	)
}

export default PageTitle

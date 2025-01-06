import React from 'react'

import { cn } from '@/lib/utils'

interface IYingYang {
	type: 1 | 0 // yang = 1 , yin = 0
	active?: boolean
	className?: string
}

function YinYang({ type = 0, active, className }: IYingYang) {
	if (type === 1) {
		return (
			<div
				className={cn(
					'h-3 w-[52px] overflow-hidden rounded-[2px] bg-foreground shadow-yin-yang',
					active && 'active-yin-yang bg-stripes border border-red-400 bg-[length:7.07px_7.07px]',
					className
				)}
			/>
		)
	}
	return (
		<div className="flex gap-2">
			<div
				className={cn(
					'h-3 w-[22px] overflow-hidden rounded-[2px] bg-foreground shadow-yin-yang',
					active && 'active-yin-yang bg-stripes border border-red-400 bg-[length:7.07px_7.07px]',
					className
				)}
			/>
			<div
				className={cn(
					'h-3 w-[22px] overflow-hidden rounded-[2px] bg-foreground shadow-yin-yang',
					active && 'active-yin-yang bg-stripes border border-red-400 bg-[length:7.07px_7.07px]',
					className
				)}
			/>
		</div>
	)
}

export default YinYang

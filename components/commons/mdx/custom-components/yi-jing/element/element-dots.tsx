/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { cn } from '@/lib/utils'

export type ElementDotsTypeName = keyof typeof ElementDots

function ElementDot({ type, className, ...props }: { type: ElementDotsTypeName; className?: string }) {
	const Element = ElementDots[type] || ElementDots['Water']

	return <Element className={className} {...props} />
}

export default ElementDot

const ElementDots = {
	Water: (props: any) => (
		<div {...props} className={cn('size-3 rounded bg-cyan-500 dark:bg-cyan-400', props.className)} />
	),
	Fire: (props: any) => (
		<div {...props} className={cn('size-3 rounded bg-red-500 dark:bg-red-700', props.className)} />
	),
	Wood: (props: any) => (
		<div {...props} className={cn('size-3 rounded bg-green-300 dark:bg-green-500', props.className)} />
	),
	Mental: (props: any) => (
		<div
			{...props}
			className={cn('size-3 rounded border border-foreground/60 dark:border-none dark:bg-white', props.className)}
		/>
	),
	Earth: (props: any) => (
		<div {...props} className={cn('size-3 rounded bg-yellow-300 dark:bg-yellow-500', props.className)} />
	),
}

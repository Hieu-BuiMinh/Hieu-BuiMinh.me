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
		<div {...props} className={cn('size-3 rounded-full border border-cyan-700 bg-cyan-400', props.className)} />
	),
	Fire: (props: any) => (
		<div {...props} className={cn('size-3 rounded-full border border-red-700 bg-red-500', props.className)} />
	),
	Wood: (props: any) => (
		<div {...props} className={cn('size-3 rounded-full border border-green-700 bg-green-300', props.className)} />
	),
	Metal: (props: any) => (
		<div {...props} className={cn('size-3 rounded-full border border-slate-300 bg-slate-100', props.className)} />
	),
	Earth: (props: any) => (
		<div {...props} className={cn('size-3 rounded-full border border-amber-700 bg-amber-600', props.className)} />
	),
}

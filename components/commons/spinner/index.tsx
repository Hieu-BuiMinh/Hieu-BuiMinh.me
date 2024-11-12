import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

const spinnerVariants = cva('text-muted-foreground animate-spin', {
	variants: {
		size: {
			default: 'size-4',
			sm: 'size-2',
			lg: 'size-6',
			icon: 'size-10',
		},
	},
	defaultVariants: {
		size: 'default',
	},
})

type ISpinnerProps = VariantProps<typeof spinnerVariants>

function Spinner(props: ISpinnerProps) {
	return <Loader2 className={cn(spinnerVariants({ size: props.size }))} />
}

export default Spinner

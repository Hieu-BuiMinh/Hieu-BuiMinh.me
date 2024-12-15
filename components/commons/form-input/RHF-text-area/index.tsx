'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type TRHFTextAreaProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
	description?: string
	label?: string
	placeholder?: string
	className?: string
}

function RHFTextArea({ name, description, label, placeholder, className }: TRHFTextAreaProps) {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Textarea className={cn(className)} placeholder={placeholder} {...field} />
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage className="text-red-500" />
				</FormItem>
			)}
		/>
	)
}

export default RHFTextArea

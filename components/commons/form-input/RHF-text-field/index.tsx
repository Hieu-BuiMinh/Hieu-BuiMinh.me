'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type TRHFTextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
	description?: string
	label?: string
	placeholder?: string
	className?: string
}

function RHFTextField({ name, description, label, placeholder, className }: TRHFTextFieldProps) {
	const { control } = useFormContext()

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Input className={cn('', className)} placeholder={placeholder} {...field} />
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage className="text-red-500" />
				</FormItem>
			)}
		/>
	)
}

export default RHFTextField

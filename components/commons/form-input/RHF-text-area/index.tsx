// eslint-disable react/display-name
'use client'

import React, { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type TRHFTextAreaProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
	description?: string
	label?: string
	placeholder?: string
	errorMessage?: string
	className?: string
}

const RHFTextArea = forwardRef<HTMLTextAreaElement, TRHFTextAreaProps>(
	({ name, description, label, placeholder, errorMessage, className }, ref) => {
		const { control } = useFormContext()

		return (
			<FormField
				control={control}
				name={name}
				render={({ field }) => (
					<FormItem>
						{label && <FormLabel>{label}</FormLabel>}
						<FormControl>
							<Textarea
								autoComplete="off"
								autoCorrect="off"
								autoCapitalize="off"
								spellCheck="false"
								className={cn(className)}
								placeholder={placeholder}
								{...field}
								ref={ref}
							/>
						</FormControl>
						{description && <FormDescription>{description}</FormDescription>}
						{errorMessage && control._formState.errors[name] && (
							<FormMessage className="text-red-500">{errorMessage}</FormMessage>
						)}
					</FormItem>
				)}
			/>
		)
	}
)

RHFTextArea.displayName = 'RHFTextArea'

export default RHFTextArea

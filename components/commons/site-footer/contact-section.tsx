'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import RHFTextField from '@/components/commons/form-input/RHF-text-field'
import BlurImage from '@/components/commons/image/blur-image'
import { Button } from '@/components/ui/button'

const postCommentFormSchema = z.object({
	email: z.string().min(1, {
		message: 'Message cannot be empty',
	}),
})
export type TPostCommentFromSchemaType = typeof postCommentFormSchema

function FooterContactSection() {
	const methods = useForm<z.infer<TPostCommentFromSchemaType>>({
		resolver: zodResolver(postCommentFormSchema),
		defaultValues: {
			email: '',
		},
	})
	return (
		<div className="flex flex-col gap-3">
			<BlurImage
				src="/assets/images/logo/logo-dark.svg"
				className="hidden w-[45px] dark:block"
				width={5}
				height={5}
				alt="footer-logo"
			/>
			<BlurImage
				src="/assets/images/logo/logo-light.svg"
				className="blog block w-[45px] dark:hidden"
				width={5}
				height={5}
				alt="footer-logo"
			/>

			<span className="text-sm font-semibold">Keep up to date</span>
			<span className="text-xs text-muted-foreground">
				<span>Got questions or just want to say hello? Feel free to reach out</span>
				<br />
				<span>I&apos;d love to hear from you!</span>
			</span>

			<FormProvider {...methods}>
				<div className="flex flex-col items-end gap-3 md:w-80 md:flex-row">
					<RHFTextField placeholder="example@email.com" className="w-full" name="email" type="email" />

					<Button className="w-full md:w-auto" variant="secondary">
						Subscribe
					</Button>
				</div>
			</FormProvider>
		</div>
	)
}

export default FooterContactSection

'use client'

import { SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Authenticated, Unauthenticated, useConvexAuth } from 'convex/react'
import { Loader } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import RHFTextArea from '@/components/commons/form-input/RHF-text-area'
import { Button } from '@/components/ui/button'

const guestbookFormSchema = z.object({
	message: z.string().min(1, {
		message: 'Message cannot be empty',
	}),
})

type TGuestbookFromSchemaType = typeof guestbookFormSchema

function PostComment() {
	const { isLoading } = useConvexAuth()
	const { user } = useUser()

	const methods = useForm<z.infer<TGuestbookFromSchemaType>>({
		resolver: zodResolver(guestbookFormSchema),
		defaultValues: {
			message: '',
		},
	})

	const onSubmit = (data: z.infer<TGuestbookFromSchemaType>) => {
		console.log(data)
	}

	if (isLoading) {
		return (
			<div className="flex gap-3">
				<Loader className="animate-spin" size={20} /> Loading...
			</div>
		)
	}

	return (
		<div>
			<Unauthenticated>
				<SignInButton fallbackRedirectUrl="/guestbook" mode="modal">
					<Button
						variant="ghost"
						className="bg-foreground text-white dark:bg-gradient-to-br dark:from-yellow-500 dark:to-red-500"
					>
						{isLoading && <Loader className="animate-spin" />} Login
					</Button>
				</SignInButton>
				<span className="ml-3">to continue leaving a message</span>
			</Unauthenticated>
			<Authenticated>
				<div className="flex flex-col gap-3">
					<div className="flex gap-3">
						<div className="shrink-0">
							<UserButton
								afterSignOutUrl="/guestbook"
								signInUrl="/gusetbook"
								afterSwitchSessionUrl="/guestbook"
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-base text-foreground">{user?.fullName}</span>
							<span className="text-xs text-muted-foreground">{user?.emailAddresses[0].toString()}</span>
						</div>
					</div>

					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
							<RHFTextArea name="message" />

							<div className="mt-4 flex justify-end gap-2">
								<SignOutButton redirectUrl="/guestbook">
									<Button variant="outline" type="button">
										Logout
									</Button>
								</SignOutButton>
								<Button type="submit">Submit</Button>
							</div>
						</form>
					</FormProvider>
				</div>
			</Authenticated>
		</div>
	)
}

export default PostComment
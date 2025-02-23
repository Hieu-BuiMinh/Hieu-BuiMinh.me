'use client'

import { Loader } from 'lucide-react'

import { Button } from '@/components/ui/button'
import useLoginModal from '@/hooks/use-login-modal'
import { useStoreUserEffect } from '@/hooks/use-store-user-effect'

const UnauthorizedOverlay = () => {
	// const path = typeof window !== 'undefined' ? window.location.href : usePathname()
	const { isLoading } = useStoreUserEffect()
	const { open } = useLoginModal()

	return (
		<div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]">
			{/* <SignInButton fallbackRedirectUrl={path} signUpFallbackRedirectUrl={path} mode="modal">
				<Button
					disabled={isLoading}
					variant="ghost"
					className="bg-foreground text-white dark:bg-gradient-to-br dark:from-yellow-500 dark:to-red-500"
				>
					{isLoading && <Loader className="animate-spin" />} {isLoading ? 'Authenticating' : 'Login'}
				</Button>
				</SignInButton> */}
			<Button
				onClick={open}
				disabled={isLoading}
				variant="ghost"
				className="bg-foreground text-white dark:bg-gradient-to-br dark:from-yellow-500 dark:to-red-500"
			>
				{isLoading && <Loader className="animate-spin" />} {isLoading ? 'Authenticating' : 'Login'}
			</Button>
		</div>
	)
}

export default UnauthorizedOverlay

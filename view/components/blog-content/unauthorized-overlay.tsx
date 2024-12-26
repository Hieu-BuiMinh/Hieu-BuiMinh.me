'use client'

import { SignInButton } from '@clerk/clerk-react'
import { Loader } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useStoreUserEffect } from '@/hooks/use-store-user-effect'

const UnauthorizedOverlay = () => {
	const path = typeof window !== 'undefined' ? window.location.href : usePathname()
	const { isLoading } = useStoreUserEffect()

	return (
		<div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]">
			<SignInButton fallbackRedirectUrl={path} signUpFallbackRedirectUrl={path} mode="modal">
				<Button
					disabled={isLoading}
					variant="ghost"
					className="bg-foreground text-white dark:bg-gradient-to-br dark:from-yellow-500 dark:to-red-500"
				>
					{isLoading && <Loader className="animate-spin" />} {isLoading ? 'Authenticating' : 'Login'}
				</Button>
			</SignInButton>
		</div>
	)
}

export default UnauthorizedOverlay

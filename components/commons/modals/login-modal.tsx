'use client'

import { useClerk } from '@clerk/clerk-react'
import { useClientContext } from '@clerk/shared/react/index'
import type { OAuthStrategy } from '@clerk/types'
import { DialogTitle } from '@radix-ui/react-dialog'
import { usePathname } from 'next/navigation'

import { SVGIcons } from '@/components/commons/icons/svg-icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import useLoginModal from '@/hooks/use-login-modal'
import { useStoreUserEffect } from '@/hooks/use-store-user-effect'

function LoginModal() {
	const path = typeof window !== 'undefined' ? window.location.href : usePathname()
	const { isOpen, close } = useLoginModal()

	const { isAuthenticated } = useStoreUserEffect()
	const {} = useClerk()
	const clerkInstance = useClientContext()

	const onCancel = () => {
		close()
	}

	const loginWith = ({ strategy }: { strategy: OAuthStrategy }) => {
		clerkInstance?.signIn.authenticateWithRedirect({
			strategy: strategy,
			redirectUrl: path,
			redirectUrlComplete: path,
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={onCancel}>
			<DialogContent className="max-w-sm">
				<DialogHeader>
					<DialogTitle className="text-center text-base font-bold">
						{isAuthenticated ? 'Logout' : 'Login'}
					</DialogTitle>

					<DialogDescription className="text-center">
						{isAuthenticated ? 'See you 👋' : 'Welcome to my app 🎉'}
					</DialogDescription>
				</DialogHeader>

				<div className="flex gap-2">
					<Button
						onClick={() => {
							loginWith({ strategy: 'oauth_github' })
						}}
						className="w-full"
						variant="outline"
					>
						<SVGIcons.gitHub />
						Github
					</Button>
					<Button
						onClick={() => {
							loginWith({ strategy: 'oauth_google' })
						}}
						className="w-full"
						variant="outline"
					>
						<SVGIcons.google />
						Google
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default LoginModal

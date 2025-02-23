'use client'

import { useClerk } from '@clerk/clerk-react'
import { CodeIcon, CommandIcon, LinkIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { SVGIcons } from '@/components/commons/icons/svg-icons'
import { Button } from '@/components/ui/button'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command'
import { DialogTitle } from '@/components/ui/dialog'
import { SITE_CONFIG } from '@/config/site'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import useLoginModal from '@/hooks/use-login-modal'
import { useStoreUserEffect } from '@/hooks/use-store-user-effect'

function CommandMenu() {
	const path = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const [copy] = useCopyToClipboard()

	const clerk = useClerk()
	const { open } = useLoginModal()

	const { isAuthenticated } = useStoreUserEffect()

	const openLink = useCallback((url: string) => {
		setIsOpen(false)
		window.open(url, '_blank', 'noopener')
	}, [])

	const groups = [
		{
			name: 'Account',
			actions: [
				{
					title: isAuthenticated ? 'Logout' : 'Login',
					icon: isAuthenticated ? (
						<LogOutIcon className="mr-3 size-4" />
					) : (
						<LogInIcon className="mr-3 size-4" />
					),
					onSelect: () => {
						setIsOpen(false)
						if (!isAuthenticated) {
							// clerk.openSignIn({})
							open()
						} else if (isAuthenticated) {
							clerk.signOut({ redirectUrl: path })
						}
					},
				},
			],
		},
		{
			name: 'General',
			actions: [
				{
					title: 'Copy Link',
					icon: <LinkIcon className="mr-3 size-4" />,
					onSelect: async () => {
						setIsOpen(false)

						await copy({ text: window.location.href })
					},
				},
				{
					title: 'Source code',
					icon: <CodeIcon className="mr-3 size-4" />,
					onSelect: () => {
						openLink(SITE_CONFIG.links.github)
					},
				},
			],
		},

		{
			name: 'Social',
			actions: [
				{
					title: 'GitHub',
					icon: <SVGIcons.gitHub className="mr-3 size-4" />,
					onSelect: () => {
						openLink(SITE_CONFIG.links.github)
					},
				},
				{
					title: 'Facebook',
					icon: <SVGIcons.facebook className="mr-3 size-4" />,
					onSelect: () => {
						openLink(SITE_CONFIG.links.facebook)
					},
				},
				{
					title: 'Instagram',
					icon: <SVGIcons.instagram className="mr-3 size-4" />,
					onSelect: () => {
						openLink(SITE_CONFIG.links.instagram)
					},
				},
				{
					title: 'x.com',
					icon: <SVGIcons.X className="mr-3 size-4" />,
					onSelect: () => {
						openLink(SITE_CONFIG.links.twitter)
					},
				},
				{
					title: 'YouTube',
					icon: <SVGIcons.youtube className="mr-3 size-4" />,
					onSelect: () => {
						openLink(SITE_CONFIG.links.youtube)
					},
				},
			],
		},
	]

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setIsOpen((value) => !value)
			}
		}

		document.addEventListener('keydown', down)

		return () => {
			document.removeEventListener('keydown', down)
		}
	}, [])

	return (
		<>
			<Button
				variant="ghost"
				className="size-9 p-0"
				onClick={() => {
					setIsOpen(true)
				}}
				type="button"
				aria-label="Open command menu"
			>
				<CommandIcon className="size-4" />
			</Button>
			<CommandDialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTitle />
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{groups.map((group, i) => (
						<Fragment key={group.name}>
							<CommandGroup heading={group.name}>
								{group.actions.map((action) => (
									<CommandItem key={action.title} onSelect={action.onSelect}>
										{action.icon}
										{action.title}
									</CommandItem>
								))}
							</CommandGroup>
							{i === groups.length - 1 ? null : <CommandSeparator />}
						</Fragment>
					))}
				</CommandList>
			</CommandDialog>
		</>
	)
}

export default CommandMenu

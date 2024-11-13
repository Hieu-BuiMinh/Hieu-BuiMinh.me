'use client'

import {
	CodeIcon,
	CommandIcon,
	Facebook,
	Github,
	Instagram,
	LinkIcon,
	LogOutIcon,
	Twitter,
	Youtube,
} from 'lucide-react'
import { Fragment, useCallback, useEffect, useState } from 'react'

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
import { siteConfig } from '@/config/site'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

function CommandMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const [copy] = useCopyToClipboard()

	const openLink = useCallback((url: string) => {
		setIsOpen(false)
		window.open(url, '_blank', 'noopener')
	}, [])

	const groups = [
		{
			name: 'Account',
			actions: [
				{
					title: 'Sign out',
					icon: <LogOutIcon className="mr-3 size-4" />,
					onSelect: () => {},
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
						openLink('https://github.com/Hieu-BuiMinh')
					},
				},
			],
		},

		{
			name: 'Social',
			actions: [
				{
					title: 'GitHub',
					icon: <Github className="mr-3 size-4" />,
					onSelect: () => {
						openLink(siteConfig.links.github)
					},
				},
				{
					title: 'Facebook',
					icon: <Facebook className="mr-3 size-4" />,
					onSelect: () => {
						openLink(siteConfig.links.facebook)
					},
				},
				{
					title: 'Instagram',
					icon: <Instagram className="mr-3 size-4" />,
					onSelect: () => {
						openLink(siteConfig.links.instagram)
					},
				},
				{
					title: 'X',
					icon: <Twitter className="mr-3 size-4" />,
					onSelect: () => {
						openLink(siteConfig.links.twitter)
					},
				},
				{
					title: 'YouTube',
					icon: <Youtube className="mr-3 size-4" />,
					onSelect: () => {
						openLink(siteConfig.links.youtube)
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

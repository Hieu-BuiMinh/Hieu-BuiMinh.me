'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'

export function MobileNav() {
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<DialogTitle />
			<SheetTrigger asChild>
				<div role="button" className="w-10 px-0 sm:hidden">
					<Menu className="size-5" />
					<span className="sr-only">Toggle Theme</span>
				</div>
			</SheetTrigger>
			<SheetContent side="right">
				<MobileLink onOpenChange={setOpen} href="/" className="flex items-center">
					<Image
						className="mr-3 hidden dark:block"
						src="/assets/images/logo/logo-dark.svg"
						alt="logo"
						width={35}
						height={35}
					/>
					<Image
						className="mr-3 block dark:hidden"
						src="/assets/images/logo/logo-light.svg"
						alt="logo"
						width={35}
						height={35}
					/>
					<span className="font-bold">{siteConfig.shortName}</span>
				</MobileLink>
				<div className="mt-3 flex flex-col gap-3">
					<MobileLink onOpenChange={setOpen} href="/blog">
						Blog
					</MobileLink>
					<MobileLink onOpenChange={setOpen} href="/about">
						About
					</MobileLink>
					<Link target="_blank" rel="noreferrer" aria-label="github" href={siteConfig.links.github}>
						GitHub
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	)
}

interface MobileLinkProps extends LinkProps {
	children: React.ReactNode
	onOpenChange?: (open: boolean) => void
	className?: string
}

function MobileLink({ href, onOpenChange, children, className, ...props }: MobileLinkProps) {
	const router = useRouter()
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString())
				onOpenChange?.(false)
			}}
			className={className}
			{...props}
		>
			{children}
		</Link>
	)
}

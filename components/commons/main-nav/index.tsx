'use client'

import { BookUser, Menu, UserSearch } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DialogTitle } from '@/components/ui/dialog'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const blogItems: { title: string; href: string; description: string }[] = [
	{
		title: 'Dev Blog 🧑‍💻',
		href: '/blog',
		description: 'Re-usable components built using Radix UI and Tailwind CSS.',
	},
	{
		title: 'blog 🛸',
		href: '/blog/404',
		description: 'How to install dependencies and structure your app.',
	},
	{
		title: 'blog 🛸...',
		href: '/blog/404',
		description: 'Styles for headings, paragraphs, lists...etc',
	},
]

const aboutItems: { title: string; href: string; description: string }[] = [
	{
		title: 'About me 😃',
		href: '/about',
		description: 'A place where you can learn some fun facts and important details about me!',
	},
	{
		title: 'My dev journey 🚀',
		href: '/about/my-journey',
		description: `A sneak peek into my coding adventures and the projects I've been working on.`,
	},
	{
		title: 'Me & my Crew 🤌',
		href: '/about/me-and-my-friends',
		description: 'A fun progress tracker that shows how far my team and I have come on a project.',
	},
	{
		title: 'Some topics I like ❤️',
		href: '/about/primitives/scroll-area',
		description: `A place to explore the things I'm passionate about and love sharing.`,
	},
	{
		title: 'Insanity 🤡',
		href: '/about/primitives/tabs',
		description: 'How far down the rabbit hole do you wanna go!?',
	},
]

export function MainNav() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<Image
							className="hidden dark:block"
							src="/assets/images/logo/logo-dark.svg"
							alt="logo"
							width={35}
							height={35}
						/>
						<Image
							className="block dark:hidden"
							src="/assets/images/logo/logo-light.svg"
							alt="logo"
							width={35}
							height={35}
						/>
						<span className="font-bold">{siteConfig.name}</span>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden sm:inline-flex">
					<NavigationMenuTrigger className="bg-transparent">Blog</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-background">
						<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<Link
										className="flex size-full select-none flex-col justify-end rounded-md bg-pinned p-6 no-underline outline-none focus:shadow-md dark:bg-pinned-dark"
										href="/"
									>
										<Image
											className="hidden dark:block"
											src="/assets/images/logo/logo-dark.svg"
											alt="logo"
											width={35}
											height={35}
										/>
										<Image
											className="block dark:hidden"
											src="/assets/images/logo/logo-light.svg"
											alt="logo"
											width={35}
											height={35}
										/>
										<div className="mb-2 mt-4 font-medium text-foreground">Hieu.BM</div>
										<p className="text-sm italic leading-tight text-foreground">
											I&apos;m Hieu A Frontend Developer Creating websites using React.
										</p>
									</Link>
								</NavigationMenuLink>
							</li>
							{blogItems.map((item) => (
								<ListItem key={item.title} title={item.title} href={item.href}>
									{item.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden sm:inline-flex">
					<NavigationMenuTrigger className="bg-transparent">About</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-background">
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{aboutItems.map((item) => (
								<ListItem key={item.title} title={item.title} href={item.href}>
									{item.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}
					>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		)
	}
)
ListItem.displayName = 'ListItem'

export const MobileNav = () => {
	const [open, setOpen] = React.useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<DialogTitle />
			<SheetTrigger className="sm:hidden" asChild>
				<div role="button" className="w-10 px-0 sm:hidden">
					<Menu className="size-5" />
					<span className="sr-only">Toggle Theme</span>
				</div>
			</SheetTrigger>
			<SheetContent side="right" className="flex flex-col gap-4">
				<Accordion defaultValue="item-1" type="single" collapsible className="w-full pt-5">
					<AccordionItem className="border-none" value="item-1">
						<AccordionTrigger>
							<div className="flex items-center gap-3">
								<BookUser size={20} />
								Blog
							</div>
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-4 border-l pl-3">
							{blogItems.map((item) => (
								<Link
									onClick={() => {
										setOpen(false)
									}}
									key={item.title}
									href={item.href}
								>
									{item.title}
								</Link>
							))}
						</AccordionContent>
					</AccordionItem>

					<AccordionItem className="border-none" value="item-2">
						<AccordionTrigger>
							<div className="flex items-center gap-3">
								<UserSearch size={20} />
								About
							</div>
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-4 border-l pl-3">
							{aboutItems.map((item) => (
								<Link
									onClick={() => {
										setOpen(false)
									}}
									key={item.title}
									href={item.href}
								>
									{item.title}
								</Link>
							))}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</SheetContent>
		</Sheet>
	)
}

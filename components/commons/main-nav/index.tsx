'use client'

import type { LucideIcon } from 'lucide-react'
import {
	BookUser,
	FileUser,
	Flame,
	Hash,
	Heart,
	Library,
	Menu,
	MessageCircleHeart,
	NotebookText,
	Quote,
	Rocket,
	Snail,
	Sparkles,
	UserSearch,
} from 'lucide-react'
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
import { cn } from '@/lib/utils'

const blogItems: { title: string; href: string; description: string; icon?: LucideIcon }[] = [
	{
		title: 'Dev Blog ',
		href: '/dev-blog',
		description: 'Re-usable components built using Radix UI and Tailwind CSS.',
		icon: NotebookText,
	},
	{
		title: 'Documents',
		href: '/docs',
		description: 'Styles for headings, paragraphs, lists...etc',
		icon: Library,
	},
	{
		title: 'Guestbook',
		href: '/guestbook',
		description: 'Sign my guestbook and share your idea. You can tell me anything here!',
		icon: MessageCircleHeart,
	},
]

const aboutItems: { title: string; href: string; description: string; icon?: LucideIcon }[] = [
	{
		title: 'About me 😃',
		href: '/about',
		description: 'A place where you can learn some fun facts and important details about me!',
		icon: FileUser,
	},
	{
		title: 'My dev journey',
		href: '/experiences',
		description: `A glimpse into my coding adventures and projects.`,
		icon: Rocket,
	},
	{
		title: 'Projects',
		href: '/projects',
		description: 'The list of my projects. Everything was made with.',
		icon: Heart,
	},
	{
		title: 'Some topics I like',
		href: '/interests',
		description: `A place to explore the things I'm passionate about and love sharing.`,
		icon: Flame,
	},
	{
		title: 'Tags',
		href: '/tags',
		description: 'Organized chaos awaits! Browse tags and see what catches your eye.',
		icon: Hash,
	},
]

const inspiration: { title: string; href: string; description: string; icon?: LucideIcon }[] = [
	{
		title: 'Short Sparks 🌟',
		href: '/short-sparks',
		description: 'Styles for headings, paragraphs, lists...etc',
		icon: Sparkles,
	},
	{
		title: 'Quotes 🌱',
		href: '/quotes',
		description: 'Organized chaos awaits! Browse tags and see what catches your eye.',
		icon: Quote,
	},
	{
		title: 'Insanity 🤡',
		href: '/about/insanity',
		description: 'How far down the rabbit hole do you wanna go!?',
		icon: Snail,
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
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden sm:inline-flex">
					<NavigationMenuTrigger className="bg-transparent">Blog</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-background">
						<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<Link
										className={cn(
											'flex size-full select-none flex-col justify-end rounded-md bg-[length:400%_100%] p-6 no-underline outline-none focus:shadow-md',
											'bg-gradient-to-r from-[#0FBDBD] via-[#26D97F] to-[#5af6a8]',
											'dark:bg-gradient-to-tl dark:from-[#fb7185] dark:via-[#a21caf] dark:to-[#6366f1]'
										)}
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
								<ListItem key={item.title} icon={item.icon} title={item.title} href={item.href}>
									{item.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden sm:inline-flex">
					<NavigationMenuTrigger className="bg-transparent">About</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-background">
						<ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{aboutItems.map((item) => (
								<ListItem key={item.title} icon={item.icon} title={item.title} href={item.href}>
									{item.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden sm:inline-flex">
					<NavigationMenuTrigger className="bg-transparent">Inspiration</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-background">
						<ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{inspiration.map((item) => (
								<ListItem key={item.title} icon={item.icon} title={item.title} href={item.href}>
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

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'> & { icon?: LucideIcon }>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<Link
						ref={ref}
						className={cn(
							'flex select-none items-center gap-3 space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-neutral-300/70 hover:text-accent-foreground focus:bg-neutral-300/70 focus:text-accent-foreground dark:hover:bg-neutral-900/70 dark:focus:bg-neutral-900/70',
							className
						)}
						href={props.href || ''}
					>
						{props.icon && (
							<div className="rounded-lg border bg-neutral-300 p-2 dark:bg-neutral-900">
								{<props.icon size={16} className="text-foreground/60" />}
							</div>
						)}
						<div className="flex flex-col gap-2">
							<div className="text-sm font-medium leading-none">{title}</div>
							<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
						</div>
					</Link>
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
					<AccordionItem className="border-none" value="item-3">
						<AccordionTrigger>
							<div className="flex items-center gap-3">
								<UserSearch size={20} />
								Inspiration
							</div>
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-4 border-l pl-3">
							{inspiration.map((item) => (
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

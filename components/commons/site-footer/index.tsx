'use client'

import Link from 'next/link'

import FooterContactSection from '@/components/commons/site-footer/contact-section'
import FooterRoutingSection from '@/components/commons/site-footer/routing-section'
import { Separator } from '@/components/ui/separator'
import { SOCIAL_LINKS } from '@/config/site'

function SiteFooter() {
	return (
		<div className="relative m-auto max-w-screen-xl p-3 md:p-10">
			{/* <span className="absolute inset-x-0 -top-52 -z-10 h-52 bg-gradient-to-b from-transparent to-foreground/10 dark:to-muted/15" /> */}
			<div className="grid grid-cols-1 gap-7 py-16 md:grid-cols-2 md:gap-5">
				<div className="col-span-1">
					<FooterContactSection />
				</div>
				<div className="col-span-1">
					<FooterRoutingSection />
				</div>
			</div>

			<Separator className="bg-muted-foreground/10" />

			<div className="my-8 flex flex-col items-center justify-between gap-5 text-center text-xs md:flex-row">
				<span>Copyright © {new Date().getUTCFullYear()} Made with ❤️ in Vietnam.</span>
				<div className="flex gap-3">
					{SOCIAL_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							target="_blank"
							className="p-2 text-muted-foreground hover:text-foreground"
						>
							<link.icon className="size-[18px]" />
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default SiteFooter

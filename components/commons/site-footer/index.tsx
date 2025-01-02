import Link from 'next/link'
import React from 'react'

import { SVGIcons } from '@/components/commons/icons/svg-icons'
import BlurImage from '@/components/commons/image/blur-image'
import { SITE_CONFIG } from '@/config/site'

const routes = [
	{
		title: 'Blogs',
		links: [{ lable: 'Blog', href: '/dev-blog' }],
	},
	{
		title: 'About',
		links: [
			{ lable: 'About me', href: '/about' },
			{ lable: 'My dev journey', href: '/about' },
			{ lable: 'Some topics I like', href: '/about' },
			{ lable: 'Insanity', href: '/about' },
		],
	},
]

function SiteFooter() {
	return (
		<div className="flex w-full flex-col gap-8 border-t p-3 md:py-6">
			<BlurImage
				src="/assets/images/logo/logo-dark.svg"
				className="hidden w-[80px] dark:block"
				width={10}
				height={10}
				alt="footer-logo"
			/>
			<BlurImage
				src="/assets/images/logo/logo-light.svg"
				className="blog block w-[80px] dark:hidden"
				width={10}
				height={10}
				alt="footer-logo"
			/>
			<div className="flex justify-between">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-3">
						<p className="font-semibold">Contact</p>
						<div className="flex gap-3">
							<Link
								target="_blank"
								href={SITE_CONFIG.links.github}
								className="text-sm font-light text-muted-foreground hover:text-foreground"
							>
								<SVGIcons.gitHub className="size-5" />
							</Link>
							<Link
								target="_blank"
								href={SITE_CONFIG.links.facebook}
								className="text-sm font-light text-muted-foreground hover:text-foreground"
							>
								<SVGIcons.facebook className="size-5" />
							</Link>
							<Link
								target="_blank"
								href={SITE_CONFIG.links.twitter}
								className="text-sm font-light text-muted-foreground hover:text-foreground"
							>
								<SVGIcons.X className="size-5" />
							</Link>
							<Link
								target="_blank"
								href={SITE_CONFIG.links.instagram}
								className="text-sm font-light text-muted-foreground hover:text-foreground"
							>
								<SVGIcons.instagram className="size-5" />
							</Link>
							<Link
								target="_blank"
								href={SITE_CONFIG.links.linkedin}
								className="text-sm font-light text-muted-foreground hover:text-foreground"
							>
								<SVGIcons.linkedIn className="size-5" />
							</Link>
						</div>
						<Link
							href="mailto:minhhieu2122000@gmail.com"
							className="text-sm font-light text-muted-foreground hover:text-foreground"
						>
							minhhieu2122000@gmail.com
						</Link>
						<Link
							href="tel:+84838739523"
							className="text-sm font-light text-muted-foreground hover:text-foreground"
						>
							&#40;+84&#41; 838 739 523
						</Link>
					</div>
					<div className="flex flex-col gap-3">
						<p className="font-semibold">Location</p>
						<span className="text-sm font-light text-muted-foreground hover:text-foreground">
							Ho Chi Minh City • Vietnam
						</span>
					</div>
				</div>
				<div className="flex gap-5">
					{routes.map((route) => {
						return (
							<div key={route.title} className="flex flex-col gap-3">
								<p className="font-semibold">{route.title}</p>
								{route.links.map((link) => {
									return (
										<Link
											key={link.lable}
											href={link.href}
											className="text-sm font-light text-muted-foreground hover:text-foreground"
										>
											{link.lable}
										</Link>
									)
								})}
							</div>
						)
					})}
				</div>
			</div>

			<div className="text-sm">&#169; {new Date().getFullYear()} Hieu.BuiMinh</div>
		</div>
	)
}

export default SiteFooter

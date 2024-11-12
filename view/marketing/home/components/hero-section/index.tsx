import { Circle } from 'lucide-react'
import React from 'react'

import { BlurImage } from '@/components/commons/image/blur-image'
import { BadgeAnimated } from '@/view/marketing/home/components/badge-animated'

function HeroSection() {
	return (
		<section className="relative flex items-center justify-between rounded-md py-16 md:py-20">
			<div className="flex flex-col gap-3">
				<BadgeAnimated className="flex items-center gap-2 text-sm">
					<Circle className="size-2 animate-pulse fill-green-600 text-green-600 dark:fill-green-400 dark:text-green-400" />
					Available for work
				</BadgeAnimated>
				<h1 className="font-title bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text text-2xl font-bold text-transparent sm:text-5xl">
					I&apos;m Hieu, a Frontend Developer
				</h1>
				<h2 className="font-title bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text text-2xl font-bold text-transparent sm:text-5xl">
					Creating websites using React.
				</h2>
				<div className="text-sm text-muted-foreground">Ho Chi Minh City • UTC/GMT +7</div>
			</div>
			<div className="relative hidden size-28 md:block">
				<BlurImage
					src="/assets/images/logo/logo-circle-light.svg"
					className="hidden rounded-full dark:block"
					width={112}
					height={112}
					alt="Hieu"
					lazy={false}
				/>
				<BlurImage
					src="/assets/images/logo/logo-circle-dark.svg"
					className="block rounded-full dark:hidden"
					width={112}
					height={112}
					alt="Hieu"
					lazy={false}
				/>
				<div className="absolute inset-0 -z-10 animate-pulse bg-gradient-to-tl from-red-700 to-purple-700 opacity-50 blur-2xl transition" />
			</div>
		</section>
	)
}

export default HeroSection

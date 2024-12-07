'use client'

import React from 'react'

import DownLoadResumeButton from '@/components/commons/buttons/resume-button'
import BlurImage from '@/components/commons/image/blur-image'
import { BadgeAnimated } from '@/view/marketing/home/components/badge-animated'

function HeroSection() {
	return (
		<section>
			<div className="flex items-center justify-between rounded-md pb-5 pt-16 md:pt-20">
				<div className="flex max-w-[690px] flex-col gap-3">
					<BadgeAnimated className="flex items-center gap-2 text-sm">
						<span className="relative flex size-2">
							<span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75 dark:bg-green-400" />
							<span className="relative inline-flex size-full rounded-full bg-green-500 dark:bg-green-500" />
						</span>
						Available for work
					</BadgeAnimated>
					<h1 className="hero-auth-name">I&apos;m Hieu</h1>
					<h1 className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text text-2xl font-bold text-transparent sm:text-5xl">
						A Frontend Developer
					</h1>
					<h2 className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70 to-90% bg-clip-text text-2xl font-bold text-transparent sm:text-5xl sm:!leading-loose">
						Creating websites using
					</h2>
					<span className="hero-stack-name">React</span>
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
					<div className="absolute inset-0 -z-10 animate-pulse bg-foreground opacity-50 blur-2xl transition" />
				</div>
			</div>
			<DownLoadResumeButton />
		</section>
	)
}

export default HeroSection

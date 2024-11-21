import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import LocationCard from '@/view/marketing/home/components/about-me/location.card'

function AboutMe() {
	return (
		<div className="relative my-24">
			<div className="font-title text-center text-3xl font-bold sm:text-4xl">About Me</div>
			<div className="mt-12 grid gap-4 md:grid-cols-2">
				<div className="grid gap-4">
					<LocationCard />
				</div>
				<div className="grid gap-4">
					<div className="grid gap-4 [@media(min-width:450px)]:grid-cols-2">div</div>
				</div>
			</div>
			<div className="my-8 flex items-center justify-center">
				<Link href="/about" className={cn(buttonVariants({ variant: 'outline' }), 'rounded-xl')}>
					Know more about me
				</Link>
			</div>
		</div>
	)
}

export default AboutMe

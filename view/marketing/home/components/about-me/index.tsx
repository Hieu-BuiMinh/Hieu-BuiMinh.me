import { MapPinCheckInside } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CodingHours } from '@/view/marketing/home/components/about-me/coding-hours'
import ConnectSection from '@/view/marketing/home/components/about-me/connect-section'
import LocationCard from '@/view/marketing/home/components/about-me/location-card'
import StacksSection from '@/view/marketing/home/components/about-me/stacks-section'
import StudyingCard from '@/view/marketing/home/components/about-me/studying-card'

function AboutMe() {
	return (
		<div className="relative my-24">
			<div className="font-title text-center text-3xl font-bold sm:text-4xl">About Me</div>

			<div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
				<div className="col-span-2 grid min-h-[200px] grid-cols-1 gap-4 md:grid-cols-4">
					<div className="col-span-full rounded-lg p-4 shadow-feature-card dark:shadow-feature-card-dark lg:p-6">
						{/* localtion section */}
						<span className="flex items-center gap-2 text-xs text-foreground md:text-base">
							<MapPinCheckInside size={20} />
							<span>Ho Chi Minh City • Vietnam</span>
						</span>
						<LocationCard />
					</div>
					<div className="col-span-full rounded-lg shadow-feature-card dark:shadow-feature-card-dark">
						{/* Stacks section */}
						<StacksSection />
					</div>
				</div>
				<div className="col-span-2 grid min-h-[150px] grid-cols-1 gap-4 md:grid-cols-4">
					<div className="col-span-full rounded-lg shadow-feature-card dark:shadow-feature-card-dark">
						{/* Connect section */}
						<ConnectSection />
					</div>

					<div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-4 [@media(min-width:450px)]:grid-cols-2">
						<div className="col-span-full rounded-lg shadow-feature-card dark:shadow-feature-card-dark md:col-span-2 [@media(min-width:450px)]:col-span-1">
							{/* Coding hours section */}
							<CodingHours />
						</div>

						<div className="col-span-full rounded-lg shadow-feature-card dark:shadow-feature-card-dark md:col-span-2 [@media(min-width:450px)]:col-span-1">
							{/* Fav. Framework section */}
							<StudyingCard />
						</div>
					</div>
				</div>
			</div>

			<div className="my-8 flex items-center justify-center">
				<Link href="/about" className={cn(buttonVariants({ variant: 'outline' }))}>
					Know more about me
				</Link>
			</div>

			<Image
				alt=""
				src="/assets/images/background/landing-page/about-section.svg"
				className="absolute -top-20 right-0 -z-10 w-full opacity-40 md:w-[740px]"
				width={1200}
				height={1200}
			/>
		</div>
	)
}

export default AboutMe

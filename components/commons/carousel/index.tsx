/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useCallback, useEffect, useState } from 'react'

import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useMergeState } from '@/hooks/use-merge-state'
import { cn } from '@/lib/utils'

interface ICarouselSlice {
	carouselChildren?: React.ReactNode[]
	itemClassName?: string
}

const AUTOPLAY_INTERVAL = 2500

function CarouselSlice({ carouselChildren, itemClassName }: ICarouselSlice) {
	const [emblaApi, setEmblaApi] = useState<CarouselApi>()
	const [state, setState] = useMergeState({ autoplay: true })

	const handleMouseEnter = useCallback(() => {
		setState({ autoplay: false })
	}, [])

	const handleMouseLeave = useCallback(() => {
		setState({ autoplay: true })
	}, [])

	useEffect(() => {
		if (!emblaApi || !state.autoplay) return

		const autoplayInterval = setInterval(() => {
			emblaApi.scrollNext()
		}, AUTOPLAY_INTERVAL)

		return () => {
			clearInterval(autoplayInterval)
		}
	}, [emblaApi, state.autoplay])

	return (
		<div className="mx-auto max-w-xs" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<Carousel
				setApi={setEmblaApi}
				className="w-full max-w-xs"
				opts={{
					align: 'center',
					loop: true,
				}}
			>
				<CarouselContent>
					{carouselChildren?.map((child, index) => (
						<CarouselItem
							className={cn('flex size-auto items-center justify-center overflow-hidden', itemClassName)}
							key={index}
						>
							{child}
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}

export default CarouselSlice

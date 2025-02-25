'use client'

import { useEffect, useState } from 'react'

import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

function CarouselSlice() {
	const [emblaApi, setEmblaApi] = useState<CarouselApi>()
	useEffect(() => {
		// autoScroll?.options.active
	}, [])
	return (
		<Carousel
			setApi={setEmblaApi}
			opts={{
				align: 'start',
				loop: true,
				active: true,
			}}
		>
			<CarouselContent>
				<CarouselItem>...</CarouselItem>
				<CarouselItem>...</CarouselItem>
				<CarouselItem>...</CarouselItem>
			</CarouselContent>
		</Carousel>
	)
}

export default CarouselSlice

'use client'
import type Image from 'next/image'
import React, { forwardRef } from 'react'

import BlurImage from '@/components/commons/image/blur-image'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

type IImageZoomProps = {
	description?: string
	imageClassName?: string
	lazy?: boolean
} & React.ComponentPropsWithoutRef<typeof Image>

const ImageZoom = forwardRef<HTMLImageElement, IImageZoomProps>((props, ref) => {
	const { ...rest } = props

	return (
		<Dialog>
			<DialogTitle />
			<DialogTrigger asChild role="button">
				<BlurImage ref={ref} className="h-[495px]" width={1200} height={630} {...rest} />
			</DialogTrigger>
			<DialogContent className="overflow-hidden sm:max-w-screen-sm md:max-w-screen-md md:p-0">
				<BlurImage className="border" {...rest} description="" />
			</DialogContent>
		</Dialog>
	)
})

ImageZoom.displayName = 'Image'

export default ImageZoom

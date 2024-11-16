import type NextImage from 'next/image'
import React, { forwardRef } from 'react'

import { BlurImage } from '@/components/commons/image/blur-image'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const ImageZoom = forwardRef<HTMLImageElement, React.ComponentPropsWithoutRef<typeof NextImage>>((props, ref) => {
	const { ...rest } = props

	return (
		<Dialog>
			<DialogTitle />
			<DialogTrigger asChild role="button">
				<BlurImage ref={ref} className="h-[495px] rounded-lg border" width={1200} height={630} {...rest} />
			</DialogTrigger>
			<DialogContent className="sm:max-w-screen-sm md:max-w-screen-md md:p-0 lg:max-w-screen-lg">
				<BlurImage className="rounded-lg border" {...rest} />
			</DialogContent>
		</Dialog>
	)
})

ImageZoom.displayName = 'Image'

export default ImageZoom

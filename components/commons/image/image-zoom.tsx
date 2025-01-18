'use client'
import type Image from 'next/image'
import React, { forwardRef } from 'react'

import BlurImage from '@/components/commons/image/blur-image'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

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
				<BlurImage
					ref={ref}
					className={cn('h-[495px]', rest.className)}
					width={1200}
					height={630}
					quality={100}
					{...rest}
				/>
			</DialogTrigger>
			<DialogContent className="h-[75vh] max-w-screen-sm overflow-hidden p-0 md:max-w-screen-md lg:max-w-screen-xl">
				<BlurImage
					className="aspect-video size-full"
					width={1080}
					height={1200}
					src={rest.src}
					alt=""
					description=""
					imageClassName="object-contain"
					quality={100}
				/>
			</DialogContent>
		</Dialog>
	)
})

ImageZoom.displayName = 'Image'

export default ImageZoom

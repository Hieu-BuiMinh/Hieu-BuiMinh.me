'use client'

import { buildUrl } from 'cloudinary-build-url'
import React from 'react'

import ImageZoom from '@/components/commons/image/image-zoom'
import { cn } from '@/lib/utils'

type CloudinaryImgType = {
	publicId: string
	height: number
	width: number
	alt: string
	title?: string
	className?: string
	preview?: boolean
	noStyle?: boolean
	aspect?: {
		width: number
		height: number
	}
	mdx?: boolean
} & React.ComponentPropsWithoutRef<'figure'>

function CloudinaryImage(props: CloudinaryImgType) {
	const { alt, publicId, aspect, width, className, ...rest } = props

	const url = buildUrl(publicId, {
		cloud: {
			cloudName: 'hieu-buiminh',
		},
		transformations: {
			rawTransformation: aspect ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}` : undefined,
		},
	})

	return (
		<>
			<ImageZoom
				src={url}
				className={cn('h-[530px] rounded-lg border', className)}
				alt={alt || ''}
				{...rest}
				width={1200}
				height={630}
			/>
			<figcaption className="mt-4 text-center">{alt}</figcaption>
		</>
	)
}

export default CloudinaryImage

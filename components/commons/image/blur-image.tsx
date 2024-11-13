/**
 * Adapted from: https://github.com/delbaoliveira/website/blob/59e6f181ad75751342ceaa8931db4cbcef86b018/ui/BlurImage.tsx
 */
'use client'

import Image from 'next/image'
import { forwardRef, useState } from 'react'

import { cn } from '@/lib/utils'

type ImageProps = {
	imageClassName?: string
	lazy?: boolean
} & React.ComponentPropsWithoutRef<typeof Image>

export const BlurImage = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
	const fallbackSrc = '/assets/images/fallback/img-fallback-dark.jpg'
	const { alt, src, className, imageClassName, lazy = true, ...rest } = props
	const [isLoading, setIsLoading] = useState(true)
	const [currentSrc, setCurrentSrc] = useState(src)

	return (
		<div
			className={cn('flex items-center justify-center overflow-hidden', isLoading && 'animate-pulse', className)}
		>
			<Image
				ref={ref}
				className={cn(isLoading && 'scale-[1.02] blur-xl grayscale', imageClassName)}
				style={{
					transition: 'filter 700ms ease, transform 150ms ease',
				}}
				src={currentSrc}
				alt={alt}
				loading={lazy ? 'lazy' : undefined}
				priority={!lazy}
				quality={100}
				onLoad={() => {
					setIsLoading(false)
				}}
				onError={() => {
					setCurrentSrc(fallbackSrc)
				}}
				{...rest}
			/>
		</div>
	)
})

BlurImage.displayName = 'Image'

/**
 * Adapted from: https://github.com/delbaoliveira/website/blob/59e6f181ad75751342ceaa8931db4cbcef86b018/ui/BlurImage.tsx
 */
'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { forwardRef, useEffect, useState } from 'react'

import Spinner from '@/components/commons/spinner'
import { cn } from '@/lib/utils'

type ImageProps = {
	description?: string
	imageClassName?: string
	lazy?: boolean
} & React.ComponentPropsWithoutRef<typeof Image>

const BlurImage = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
	const { theme } = useTheme()
	const fallbackSrc =
		theme === 'dark'
			? '/assets/images/fallback/img-fallback-light.jpg'
			: '/assets/images/fallback/img-fallback-dark.jpg'
	const { alt, src, className, imageClassName, lazy = true, ...rest } = props
	const [isLoading, setIsLoading] = useState(true)
	const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc)

	useEffect(() => {
		setCurrentSrc(src || fallbackSrc)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme])

	useEffect(() => {
		setCurrentSrc(src || fallbackSrc)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div
			className={cn(
				'relative flex items-center justify-center overflow-hidden',
				isLoading && 'animate-pulse',
				className
			)}
		>
			<Image
				ref={ref}
				className={cn(
					'size-full object-cover',
					isLoading && 'scale-[1.02] object-cover blur-xl grayscale',
					imageClassName
				)}
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

			{rest?.description && (
				<div className="absolute left-0 top-0 line-clamp-1 flex size-[100px] flex-col items-start justify-end truncate bg-gradient-to-b from-transparent to-black p-3 font-semibold">
					{rest?.description}
				</div>
			)}

			{isLoading && (
				<div className="absolute left-0 top-0 flex size-full items-center justify-center backdrop-blur-md">
					<Spinner size={'lg'} />
				</div>
			)}
		</div>
	)
})

BlurImage.displayName = 'Image'

export default BlurImage

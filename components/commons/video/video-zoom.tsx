'use client'

import { PlayCircle } from 'lucide-react'
import { forwardRef } from 'react'

import BlurImage from '@/components/commons/image/blur-image'
import Video from '@/components/commons/video'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type TVideoZoom = {
	src: string
	width: number
	height: number
	videoClassName?: string
	previewImage?: string
	description?: string
	previewImageClassName?: string
} & React.ComponentPropsWithoutRef<'video'>

const VideoZoom = forwardRef<HTMLVideoElement, TVideoZoom>((props, ref) => {
	const { previewImage, previewImageClassName, ...rest } = props
	return (
		<>
			<Dialog>
				<DialogTitle className="hidden" />
				<DialogTrigger asChild role="button">
					<div className="not-prose group/trigger relative">
						<BlurImage
							className="rounded-md border"
							imageClassName={cn('aspect-video object-contain', previewImageClassName)}
							quality={100}
							alt=""
							src={previewImage || ''}
							description={props.description}
							width={100}
							height={100}
						/>
						<PlayCircle className="absolute left-2 top-2 size-5 text-foreground/50 transition-colors group-hover/trigger:text-foreground" />
					</div>
				</DialogTrigger>
				<DialogContent className="h-[75vh] max-w-screen-sm overflow-hidden p-1 md:max-w-screen-md md:p-0 lg:max-w-screen-xl">
					<Video ref={ref} className={cn('size-full', props.videoClassName)} {...rest} />
				</DialogContent>
			</Dialog>
		</>
	)
})

VideoZoom.displayName = 'VideoZoom'

export default VideoZoom

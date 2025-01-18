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
	previewimage?: string
	previewimageClassName?: string
}

const VideoZoom = forwardRef<HTMLVideoElement, TVideoZoom>((props, ref) => {
	return (
		<>
			<Dialog>
				<DialogTitle />
				<DialogTrigger asChild role="button">
					<div className="not-prose group/trigger relative">
						<BlurImage
							className="rounded-md border"
							imageClassName={cn('aspect-video object-contain', props.previewimageClassName)}
							quality={100}
							alt=""
							{...props}
							src={props.previewimage || ''}
							description="Work harder on yourself ❤️"
						/>
						<PlayCircle className="absolute left-2 top-2 text-foreground/50 transition-colors group-hover/trigger:text-foreground" />
					</div>
				</DialogTrigger>
				<DialogContent className="h-[75vh] max-w-screen-sm overflow-hidden md:max-w-screen-md md:p-0 lg:max-w-screen-xl">
					<Video ref={ref} {...props} className={cn('size-full', props.videoClassName)} />
				</DialogContent>
			</Dialog>
		</>
	)
})

VideoZoom.displayName = 'VideoZoom'

export default VideoZoom

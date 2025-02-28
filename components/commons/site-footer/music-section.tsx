'use client'

import { Disc3 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import BlurImage from '@/components/commons/image/blur-image'
import { cn } from '@/lib/utils'

function MusicSection() {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	const toggleAudio = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause()
			} else {
				audioRef.current.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.5
		}
	}, [])

	return (
		<div className="group relative flex cursor-pointer items-center gap-2" onClick={toggleAudio}>
			<div
				className={cn(
					'relative flex size-6 items-center justify-center overflow-hidden rounded-full',
					isPlaying && '[animation:_spin_10s_linear_infinite]'
				)}
			>
				<BlurImage
					src="/assets/images/content/footer/far-from-any-road.png"
					alt="Far from Any Road - The Handsome Family"
					width={25}
					height={25}
				/>
				<Disc3 className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 opacity-0 transition duration-300 group-hover:opacity-100" />
			</div>
			<div className="flex items-baseline gap-2 text-xs">
				<p className="line-clamp-1 text-foreground">Far from Any Road</p>
				<p className="line-clamp-1 shrink-0 text-muted-foreground/80">The Handsome Family</p>
			</div>

			<audio
				ref={audioRef}
				className="hidden w-full"
				controls
				src="/assets/audios/background/far-from-any-road.mp3"
			/>
		</div>
	)
}

export default MusicSection

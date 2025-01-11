'use client'

import React, { useEffect, useRef } from 'react'

interface IAudio {
	src: string
}

function Audio({ src }: IAudio) {
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.5
		}
	}, [])

	return (
		<figure className="sticky top-16 z-10 w-full">
			<audio ref={audioRef} className="w-full" controls src={src}></audio>
		</figure>
	)
}

export default Audio

'use client'

import createGlobe from 'cobe'
import { useTheme } from 'next-themes'
import React, { useEffect, useRef } from 'react'
import { useSpring } from 'react-spring'

function LocationCard() {
	const { theme } = useTheme()
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const pointerInteracting = useRef<number | null>(null)
	const pointerInteractionMovement = useRef(0)
	const [{ r }, api] = useSpring(() => ({
		r: 0,
		config: {
			mass: 1,
			tension: 280,
			friction: 40,
			precision: 0.001,
		},
	}))

	useEffect(() => {
		if (!canvasRef.current) return

		let width = 0
		let phi = 0

		const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
		window.addEventListener('resize', onResize)
		onResize()

		const globe = createGlobe(canvasRef.current, {
			devicePixelRatio: 2,
			width: width * 2,
			height: width * 2,
			phi: 0,
			theta: -0.2,
			dark: theme === 'dark' ? 1 : 0,
			diffuse: 3,
			mapSamples: 16000,
			mapBrightness: theme === 'dark' ? 1.2 : 3.5,
			baseColor: [1, 1, 1],
			markerColor: [48 / 255, 213 / 255, 52 / 255],
			glowColor: theme === 'dark' ? [1.2, 1.2, 1.2] : [0, 0, 0],
			markers: [{ location: [10.82302, 106.62965], size: 0.1 }],
			onRender: (state) => {
				if (!pointerInteracting.current) {
					phi += 0.005
				}
				state.phi = phi + r.get()
				state.width = width * 2
				state.height = width * 2
			},
		})
		setTimeout(() => {
			if (canvasRef.current) {
				return (canvasRef.current.style.opacity = '1')
			}
		})
		return () => {
			globe.destroy()
			window.removeEventListener('resize', onResize)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme])
	return (
		<div className="relative h-[250px] overflow-hidden">
			<div
				className="absolute inset-x-0 bottom-[-20px]"
				style={{
					width: '100%',
					// maxWidth: 650,
					aspectRatio: 1,
					margin: 'auto',
					position: 'relative',
				}}
			>
				<canvas
					ref={canvasRef}
					onPointerDown={(e) => {
						pointerInteracting.current = e.clientX - pointerInteractionMovement.current
						canvasRef.current!.style.cursor = 'grabbing'
					}}
					onPointerUp={() => {
						pointerInteracting.current = null
						canvasRef.current!.style.cursor = 'grab'
					}}
					onPointerOut={() => {
						if (canvasRef.current) {
							pointerInteracting.current = null
							canvasRef.current.style.cursor = 'grab'
						}
					}}
					onMouseMove={(e) => {
						if (pointerInteracting.current !== null) {
							const delta = e.clientX - pointerInteracting.current
							pointerInteractionMovement.current = delta
							api.start({
								r: delta / 200,
							})
						}
					}}
					onTouchMove={(e) => {
						if (pointerInteracting.current !== null && e.touches[0]) {
							const delta = e.touches[0].clientX - pointerInteracting.current
							pointerInteractionMovement.current = delta
							api.start({
								r: delta / 100,
							})
						}
					}}
					style={{
						width: '100%',
						height: '100%',
						cursor: 'grab',
						contain: 'layout paint size',
						opacity: 0,
						transition: 'opacity 1s ease',
					}}
				/>
			</div>
		</div>
	)
}

export default LocationCard

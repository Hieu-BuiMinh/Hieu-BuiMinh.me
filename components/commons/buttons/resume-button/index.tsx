'use client'

import confetti from 'canvas-confetti'
import { ArrowDownToLine, Loader } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface IDownLoadResumeButton {
	innerText?: string
	className?: string
}

function DownLoadResumeButton({ innerText, className }: Readonly<IDownLoadResumeButton>) {
	const [loading, setLoading] = useState(false)

	const explodeConfetti = () => {
		const duration = 3 * 1000
		const animationEnd = Date.now() + duration
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

		function randomInRange(min: number, max: number) {
			return Math.random() * (max - min) + min
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const interval: any = setInterval(function () {
			const timeLeft = animationEnd - Date.now()

			if (timeLeft <= 0) {
				return clearInterval(interval)
			}

			const particleCount = 50 * (timeLeft / duration)
			// since particles fall down, start a bit higher than random
			confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
			confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
		}, 250)
	}

	const handleloading = () => {
		setLoading(true)
		explodeConfetti()
		setTimeout(() => {
			setLoading(false)
			toast.success('Thanks for downloading 🔥', {
				duration: 3500,
			})
		}, 3000)
	}

	return (
		<a href="/assets/files/pdf/[Junior-Frontend]_[BuiMinhHieu]_[2025].pdf" className={className} download>
			<Button
				className={cn('w-full bg-muted text-foreground', {
					'text-foreground dark:bg-gradient-to-r dark:from-yellow-500 dark:to-red-500 bg-foreground text-white':
						!loading,
				})}
				onClick={handleloading}
				disabled={loading}
			>
				{innerText ?? 'know more about me!'}
				{loading ? (
					<Loader size={20} className="animate-spin" />
				) : (
					<ArrowDownToLine size={20} className="hidden animate-bounce md:block" />
				)}
			</Button>
		</a>
	)
}

export default DownLoadResumeButton

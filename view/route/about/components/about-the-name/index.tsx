import BlurImage from '@/components/commons/image/blur-image'
import { buttonVariants } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

function AboutTheName() {
	return (
		<Dialog>
			<DialogTrigger
				className={cn(
					buttonVariants({ variant: 'link' }),
					'p-0 text-muted-foreground/50 hover:text-foreground'
				)}
			>
				Why &quot;Stephen.K&quot;?
			</DialogTrigger>
			<DialogContent className="max-w-screen-sm md:max-w-screen-md">
				<DialogHeader>
					<DialogTitle>For those curious about my name ⟁</DialogTitle>
					<DialogDescription>Let me tell you a bit about the inspiration behind my name.</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-3">
					<div className="flex gap-3">
						<BlurImage
							src="https://i.imgur.com/HkgEaPi.jpeg"
							alt="stephen-strange"
							width={500}
							height={500}
							className="h-36 w-full rounded-md md:h-56"
							description="Stephen Strange"
						/>
						<BlurImage
							src="https://i.imgur.com/uSKRoXf.jpeg"
							alt="back-kaiser"
							width={500}
							height={500}
							className="h-36 w-full rounded-md md:h-56"
							description="Black Kaiser"
						/>
					</div>
					<div>
						Hi, I&apos;m Stephen Kaiser—a storyteller and Developer with a passion for creativity. Inspired
						by Stephen Strange from Doctor Strange and the resilient Black Kaiser from Polar (2019), I blend
						intellect with strength in everything I do. This blog is my space to share insights, creative
						stories, and fresh perspectives on life, coding, and more. Join me as we dive into the stories
						that shape our world, and let&apos;s explore new ideas together. Welcome aboard!
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default AboutTheName

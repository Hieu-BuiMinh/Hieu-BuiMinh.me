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
				Why &quot;Stephen&quot;?
			</DialogTrigger>
			<DialogContent className="max-w-screen-sm md:max-w-screen-md">
				<DialogHeader>
					<DialogTitle className="text-sm md:text-base">For those curious about my name ⟁</DialogTitle>
					<DialogDescription className="text-xs italic md:text-sm">
						Let me tell you a bit about the inspiration behind it.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-3">
					<div className="flex gap-3">
						<BlurImage
							src="https://i.imgur.com/HkgEaPi.jpeg"
							alt="stephen-strange"
							width={500}
							height={500}
							className="m-auto h-48 min-w-48 rounded-md md:h-56 md:w-1/2"
							description="Stephen Strange"
						/>
					</div>
					<div className="text-xs md:text-sm">
						Hey, I&apos;m Stephen _ a storyteller and developer with a passion for creativity. Inspired by
						Stephen Strange from Doctor Strange, I blend intellect with strength in everything I do. This
						blog is my space to share insights, creative stories, and fresh perspectives on life, coding,
						and more. Let&apos;s dive into the stories that shape our world and explore new ideas together.
						Welcome aboard!
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default AboutTheName

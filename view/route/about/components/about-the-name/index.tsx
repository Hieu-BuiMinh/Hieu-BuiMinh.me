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
				Why &quot;Walter Cipher&quot;?
			</DialogTrigger>
			<DialogContent className="max-w-screen-sm md:max-w-screen-md">
				<DialogHeader>
					<DialogTitle>For those curious about my name ⟁</DialogTitle>
					<DialogDescription>Let me tell you a bit about the inspiration behind my name.</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-3">
					<div className="flex gap-3">
						<BlurImage
							src="https://i.imgur.com/hxwdrmN.jpeg"
							alt="walter-bishop"
							width={500}
							height={500}
							className="h-36 w-full rounded-md md:h-56"
							description="Walter Bishop"
						/>
						<BlurImage
							src="https://i.imgur.com/dQzxNLV.jpeg"
							alt="bill-cipher"
							width={500}
							height={500}
							className="h-36 w-full rounded-md md:h-56"
							description="Bill Cipher"
						/>
					</div>
					<div>
						Welcome to my world, where creativity knows no bounds! I&apos;m Walter Cipher, a fusion of two
						iconic figures that have shaped my journey. Walter Bishop, the brilliant mind from Fringe, and
						Bill Cipher, the enigmatic force from Gravity Falls. These characters, both complex and
						mysterious, inspire my work and passion for storytelling, technology, and self-expression. If
						you&apos;re here to explore the world of innovation, mind-bending stories, and transformative
						ideas, you&apos;re in the right place. Let&apos;s kick off this journey together!
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default AboutTheName

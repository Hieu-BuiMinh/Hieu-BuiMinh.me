import { TooltipArrow } from '@radix-ui/react-tooltip'
import { ZapIcon } from 'lucide-react'
import Link from 'next/link'

import { SVGIcons } from '@/components/commons/icons/svg-icons'
import Marquee from '@/components/commons/marquee'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { technologies } from '@/view/marketing/home/components/about-me/data/technology'

function StacksSection() {
	return (
		<div className="flex w-full flex-col p-4 lg:p-6">
			<span className="mb-2 flex items-center gap-2 text-xs text-foreground md:text-base">
				<ZapIcon size={20} />
				<span>Stacks</span>
			</span>
			<Marquee gap="20px" className="py-4" fade pauseOnHover>
				{technologies.map((technology) => {
					const Icon = SVGIcons[technology.icon]

					return (
						<TooltipProvider key={technology.url}>
							<Tooltip>
								<TooltipTrigger>
									<Link
										href={technology.url}
										rel="noopener noreferrer"
										target="_blank"
										aria-label={technology.name}
									>
										<Icon className="size-10" />
									</Link>
								</TooltipTrigger>
								<TooltipContent>
									<TooltipArrow />
									{technology.name}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)
				})}
			</Marquee>
			<Marquee gap="20px" className="py-4" fade pauseOnHover reverse>
				{technologies.map((technology) => {
					const Icon = SVGIcons[technology.icon]

					return (
						<TooltipProvider key={technology.url}>
							<Tooltip>
								<TooltipTrigger>
									<Link
										href={technology.url}
										rel="noopener noreferrer"
										target="_blank"
										aria-label={technology.name}
									>
										<Icon className="size-10" />
									</Link>
								</TooltipTrigger>
								<TooltipContent>
									<TooltipArrow />
									{technology.name}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)
				})}
			</Marquee>
		</div>
	)
}

export default StacksSection

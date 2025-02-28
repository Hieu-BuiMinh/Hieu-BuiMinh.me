import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

import BlurImage from '@/components/commons/image/blur-image'

type LinkCardProps = {
	href: string
	hostname: string
	title: string
}

const LinkCard = (props: LinkCardProps) => {
	const { href, hostname, title } = props

	return (
		<div className="not-prose flex max-w-full justify-center overflow-hidden">
			<Link
				href={href}
				target="_blank"
				className="my-8 flex max-w-full items-center justify-center gap-4 rounded-lg border p-4"
			>
				<BlurImage
					src={`/assets/images/website-icons/${hostname}.png`}
					className="size-10 shrink-0 rounded-lg sm:size-12"
					width={48}
					height={48}
					alt={hostname}
				/>
				<div className="hidden md:block">
					<div>{title}</div>
					<div className="truncate text-sm text-muted-foreground md:max-w-[250px]">{href}</div>
				</div>
				<ExternalLinkIcon className="hidden size-[22px] md:block" />
			</Link>
		</div>
	)
}

export default LinkCard

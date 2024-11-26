import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

import { BlurImage } from '@/components/commons/image/blur-image'

type LinkCardProps = {
	href: string
	hostname: string
	title: string
}

const LinkCard = (props: LinkCardProps) => {
	const { href, hostname, title } = props

	return (
		<div className="not-prose flex justify-center">
			<Link
				href={href}
				target="_blank"
				className="my-8 flex items-center justify-center gap-4 rounded-lg border p-4"
			>
				<BlurImage
					src={`/assets/images/website-icons/${hostname}.png`}
					className="rounded-lg"
					width={48}
					height={48}
					alt={hostname}
				/>
				<div>
					<div>{title}</div>
					<div className="max-w-[250px] truncate text-sm text-muted-foreground">{href}</div>
				</div>
				<ExternalLinkIcon className="size-[22px]" />
			</Link>
		</div>
	)
}

export default LinkCard

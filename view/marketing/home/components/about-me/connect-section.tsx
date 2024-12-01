import { LinkIcon } from 'lucide-react'
import Link from 'next/link'

import { SOCIAL_LINKS } from '@/config/site'

function ConnectSection() {
	return (
		<div className="group flex size-full flex-col gap-3 p-4 lg:p-6">
			<span className="flex items-center gap-2 text-xs text-foreground md:text-base">
				<LinkIcon size={20} />
				<span>Connect</span>
			</span>
			{SOCIAL_LINKS.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className="text-muted-fg hover:text-fg flex items-center gap-3 pl-7 text-foreground"
				>
					<link.icon className="size-4" />
					<h2 className="font-light">{link.label}</h2>
				</Link>
			))}
		</div>
	)
}

export default ConnectSection

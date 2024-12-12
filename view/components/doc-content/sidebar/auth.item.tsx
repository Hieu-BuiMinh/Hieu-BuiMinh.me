import { Ellipsis } from 'lucide-react'
import Link from 'next/link'

import { SVGIcons } from '@/components/commons/icons/svg-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SITE_CONFIG } from '@/config/site'

function AuthItem() {
	return (
		<div className="flex items-center justify-between">
			<Link href="/docs" className="flex items-center gap-2 px-3">
				<span className="size-4 rounded-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#fff]  to-[#333]" />
				<span className="text-sm font-bold">Hieu.docs</span>
			</Link>

			<Popover>
				<PopoverTrigger asChild>
					<button className="me-2 rounded p-1 hover:bg-primary/10" type="button">
						<Ellipsis size={15} />
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-1 text-sm font-semibold">
					<Link
						href={SITE_CONFIG.links.github}
						className="flex items-center gap-2 rounded p-1 hover:bg-primary/10"
						role="button"
						target="_blank"
					>
						<SVGIcons.gitHub className="size-5" />
						Github
					</Link>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default AuthItem

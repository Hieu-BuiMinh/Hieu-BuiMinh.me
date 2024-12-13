'use client'

import { ChevronDown, GitCommitVertical, Library } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { docs } from '@/.velite'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

function RootToggle() {
	const params = useParams<{ category: string; slug: string[] }>()

	const allRoots = docs.filter((d) => d.type === 'ROOT')
	const currentRoot = allRoots.find((d) => d.slugAsParams === params.category && d.type === 'ROOT')

	return (
		<div className="px-1">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" className="flex h-12 w-full justify-between gap-2 p-2">
						<Library className="shrink-0" />
						<div className="flex max-w-[140px] flex-col items-start justify-between lg:max-w-[160px]">
							<span className="max-w-full truncate text-start text-xs font-semibold">
								{currentRoot?.title}
							</span>
							<p className="max-w-full truncate text-start text-xs text-muted-foreground">
								{currentRoot?.description}
							</p>
						</div>
						<ChevronDown className="shrink-0" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[var(--radix-popover-trigger-width)] overflow-hidden p-0">
					<div className="flex flex-col">
						{allRoots.map((r) => {
							return (
								<Link
									className={cn(
										'flex h-12 items-center gap-3 p-2 transition-colors hover:bg-primary/10',
										currentRoot?.id === r.id && 'bg-primary/10'
									)}
									href={`/${r.slug}`}
									key={r.id}
								>
									<GitCommitVertical size={15} className="shrink-0" />
									<div className="flex max-w-[140px] flex-col items-start justify-between lg:max-w-[160px]">
										<span className="max-w-full truncate text-start text-xs font-semibold">
											{r?.title}
										</span>
										<p className="max-w-full truncate text-start text-xs text-muted-foreground">
											{r?.description}
										</p>
									</div>
								</Link>
							)
						})}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default RootToggle

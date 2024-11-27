import { ArrowUpRightIcon, LightbulbIcon } from 'lucide-react'
import Link from 'next/link'

import type { ProjectPost } from '@/.velite'
import BlurImage from '@/components/commons/image/blur-image'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ProjectsProps = {
	projects: ProjectPost[]
}

function SelectedProjects({ projects }: ProjectsProps) {
	return (
		<div className="relative my-24">
			<div className="font-title text-center text-3xl font-bold sm:text-4xl">Selected Projects</div>
			<div className="mt-12 grid gap-4 md:grid-cols-2">
				{projects
					.filter((project) => project.shown)
					.map((project) => (
						<Card key={project.slug} project={project} />
					))}
			</div>
			<div className="my-8 flex items-center justify-center">
				<Link
					href="/projects"
					className={cn(
						buttonVariants({
							variant: 'outline',
						})
					)}
				>
					See all project
				</Link>
			</div>
		</div>
	)
}

type CardProps = {
	project: ProjectPost
}

const Card = (props: CardProps) => {
	const { project } = props
	const { slugAsParams, title, description, cover } = project

	return (
		<Link
			key={slugAsParams}
			href={`/projects/${slugAsParams}`}
			className="group relative rounded-xl p-2 shadow-feature-card dark:shadow-feature-card-dark"
		>
			<div className="flex items-center justify-between p-4">
				<div className="flex items-center gap-3">
					<LightbulbIcon className="size-[18px]" />
					<h2 className="font-light">Project</h2>
				</div>
				<ArrowUpRightIcon className="size-[18px] opacity-0 transition-opacity group-hover:opacity-100" />
			</div>
			<BlurImage width={1280} height={832} src={cover || ''} alt={title} className="rounded-lg" />
			<div className="absolute left-0 top-0 flex size-full flex-col justify-end rounded-xl bg-gradient-to-b from-transparent to-black p-3">
				<div className="transition-all ease-out group-hover:mb-6">
					<h3 className="font-title text-md line-clamp-1 font-bold text-white sm:text-2xl">{title}</h3>
					<p className="mt-2 line-clamp-1 text-zinc-100 dark:text-muted-foreground sm:line-clamp-2">
						{description}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default SelectedProjects

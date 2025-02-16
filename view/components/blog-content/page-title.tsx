interface IPageTitleProps {
	title: string
	description: string
	animate?: boolean
}

function PageTitle({ description, title }: IPageTitleProps) {
	return (
		<div className="relative flex flex-col gap-5 border-b pb-5">
			<h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
			<h2 className="bg-gradient-to-r from-foreground/65 via-foreground/90 to-foreground/65 bg-clip-text text-transparent transition-colors dark:from-neutral-300/[35%] dark:via-neutral-300/90 dark:to-neutral-300/[35%]">
				{description}
			</h2>
		</div>
	)
}

export default PageTitle

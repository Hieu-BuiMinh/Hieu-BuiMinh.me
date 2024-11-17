interface IPageTitleProps {
	title: string
	description: string
	animate?: boolean
}

function PageTitle({ description, title }: IPageTitleProps) {
	return (
		<div className="relative flex flex-col gap-5 border-b pb-5">
			<h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
			<h2 className="text-muted-foreground">{description}</h2>
		</div>
	)
}

export default PageTitle

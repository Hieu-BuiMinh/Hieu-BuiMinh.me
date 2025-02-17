import React from 'react'

interface IExperienceBlock {
	timeline: React.ReactNode | string
	title: React.ReactNode | string
	company?: {
		logo?: React.ReactNode
		name: React.ReactNode | string
	}
	content?: React.ReactNode
}

function ExperienceBlock(props: IExperienceBlock) {
	const { timeline, title, company, content } = props
	return (
		<div className="grid gap-4 md:grid-cols-[200px,1fr] md:gap-8">
			<div className="txt-tertiary mt-1 uppercase tracking-wide">{timeline}</div>

			<div>
				<div>{title}</div>
				{company && (
					<div className="mt-1 flex items-center gap-1.5 text-foreground/90">
						<span>
							{company?.logo && company?.logo} - {company.name}
						</span>
					</div>
				)}

				{content && content}
			</div>
		</div>
	)
}

export default ExperienceBlock

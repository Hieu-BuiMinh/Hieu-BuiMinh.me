import ProjectsPageView from '@/view/route/projects/pages/projects.page'

interface IProjectspageProps {
	searchParams: Promise<{ page?: string }>
}

function ProjectsPage({ searchParams }: IProjectspageProps) {
	return <ProjectsPageView searchParams={searchParams} />
}

export default ProjectsPage

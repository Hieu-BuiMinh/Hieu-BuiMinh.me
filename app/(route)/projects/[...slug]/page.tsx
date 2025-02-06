import ProjectsDetailPageView from '@/view/route/projects/pages/projects-detail.page'

interface IPostPageProps {
	params: Promise<{ slug: string[] }>
}

function ProjectsDetailPage({ params }: IPostPageProps) {
	return <ProjectsDetailPageView params={params} />
}

export default ProjectsDetailPage

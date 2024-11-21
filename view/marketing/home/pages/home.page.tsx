import { projects } from '@/.velite'
import AboutMe from '@/view/marketing/home/components/about-me'
import HeroSection from '@/view/marketing/home/components/hero-section'
import SelectedProjects from '@/view/marketing/home/components/selected-projects'

function HomePageView() {
	return (
		<div className="m-auto max-w-screen-lg p-3 md:py-6">
			<HeroSection />
			<SelectedProjects projects={projects} />
			<AboutMe />
		</div>
	)
}

export default HomePageView

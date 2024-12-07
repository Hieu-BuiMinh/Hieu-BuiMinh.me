import '../style/index.css'

import { projects } from '@/.velite'
import { devBlogPosts } from '@/.velite'
import AboutMe from '@/view/marketing/home/components/about-me'
import HeroSection from '@/view/marketing/home/components/hero-section'
import LatestArticles from '@/view/marketing/home/components/latest-articles'
import SelectedProjects from '@/view/marketing/home/components/selected-projects'

function HomePageView() {
	const latestPosts = devBlogPosts
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime()
		})
		.slice(0, 2)

	return (
		<div className="m-auto max-w-screen-lg p-3 md:py-6">
			<HeroSection />
			<SelectedProjects projects={projects} />
			<AboutMe />
			<LatestArticles devBlogPosts={latestPosts} />
		</div>
	)
}

export default HomePageView

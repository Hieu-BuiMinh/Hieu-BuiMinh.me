import '../style/index.css'

import { devBlogPosts, projects } from '@/.velite'
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
			{/* <div className="mt-5 flex gap-3">
				<Bagua index={1} actives={[1]} />
				<Bagua index={2} actives={[1]} />
				<Bagua index={3} actives={[1]} />
				<Bagua index={4} actives={[1]} />
				<Bagua index={5} actives={[1]} />
				<Bagua index={6} actives={[1]} />
				<Bagua index={7} actives={[1]} />
				<Bagua index={8} actives={[1]} />
			</div> */}
			<SelectedProjects projects={projects} />
			<AboutMe />
			<LatestArticles devBlogPosts={latestPosts} />
		</div>
	)
}

export default HomePageView

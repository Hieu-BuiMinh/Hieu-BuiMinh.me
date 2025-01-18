import { notFound } from 'next/navigation'

import { pages } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
// import Hexagram from '@/components/commons/mdx/custom-components/yi-jing/hexagram'
import PageTitle from '@/view/components/blog-content/page-title'
import PostLastUpdated from '@/view/components/blog-content/post-last-updated'

const title = 'About'
const description = '👋 Hi there! I am Hieu, a learner who loves web development.'

export default async function AboutPageView() {
	const post = pages.find((post) => post.slugAsParams === 'about')

	if (!post || !post.published) {
		notFound()
	}

	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />

			{/* <VideoZoom
				height={200}
				width={200}
				previewimage="https://i.imgur.com/DlOd62I.png"
				src="/assets/videos/motivation/jim-rohn/why-not.mp4"
			/>
			<VideoZoom
				height={200}
				width={200}
				previewimage="https://i.imgur.com/bS1Y4A9.png"
				src="/assets/videos/motivation/jim-rohn/life-changing-advice.mp4"
			/> */}

			<article className="container prose mx-auto max-w-3xl pb-6 dark:prose-invert">
				<MDXContent code={post.body} />
				{post.lastUpdated && <PostLastUpdated date={post.lastUpdated} />}
			</article>
		</div>
	)
}

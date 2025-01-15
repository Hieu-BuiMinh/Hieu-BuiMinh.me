import { notFound } from 'next/navigation'

import { pages } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import Hexagram from '@/components/commons/mdx/custom-components/yi-jing/hexagram'
import PageTitle from '@/view/components/blog-content/page-title'
import PostLastUpdated from '@/view/components/blog-content/post-last-updated'

const title = 'About'
const description = '👋 Hi there! I am Hieu, a learner who loves web development.'

export default function AboutPageView() {
	const post = pages.find((post) => post.slugAsParams === 'about')

	if (!post || !post.published) {
		notFound()
	}

	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />

			{/* <Hexagram
				showIndex
				showSixRelatives
				showElements
				showBranches
				showSixCreatures
				upper={1}
				lower={1}
				showOriginFamily
				showResultHexagram
				showQuestionerAndQuestion
				actives={[1, 2, 3, 4, 5, 6]}
			/> */}

			<div className="flex flex-wrap items-center justify-center gap-4">
				{/* <Hexagram
					showOriginFamily
					showHexagramName
					showBranches
					showElements
					showIndex
					showLabel
					showQuestionerAndQuestion
					showResultHexagram
					showHiddenRelative
					showSixCreatures
					showSixRelatives
					upper={4}
					lower={2}
					actives={[6]}
				/> */}
				<Hexagram
					showOriginFamily
					showHexagramName
					showBranches
					showElements
					showIndex
					showLabel
					showQuestionerAndQuestion
					showResultHexagram
					showHiddenRelative
					showSixCreatures
					showSixRelatives
					upper={1}
					lower={1}
				/>
				{/* <Hexagram
					showOriginFamily
					showHexagramName
					showBranches
					showElements
					showIndex
					showLabel
					showQuestionerAndQuestion
					showResultHexagram
					showHiddenRelative
					showSixCreatures
					showSixRelatives
					upper={1}
					lower={5}
					actives={[1]}
				/> */}
				<Hexagram
					showOriginFamily
					showHexagramName
					showBranches
					showElements
					showIndex
					showLabel
					showQuestionerAndQuestion
					showResultHexagram
					showHiddenRelative
					showSixCreatures
					showSixRelatives
					upper={1}
					lower={7}
					actives={[2]}
				/>
				{/* <Hexagram
					showOriginFamily
					showHexagramName
					showBranches
					showElements
					showIndex
					showLabel
					showQuestionerAndQuestion
					showResultHexagram
					showHiddenRelative
					showSixCreatures
					showSixRelatives
					upper={1}
					lower={8}
					actives={[3]}
				/>
				<Hexagram
					showOriginFamily
					showHexagramName
					showBranches
					showElements
					showIndex
					showLabel
					showQuestionerAndQuestion
					showResultHexagram
					showHiddenRelative
					showSixCreatures
					showSixRelatives
					upper={5}
					lower={8}
					actives={[4]}
				/>
				<Hexagram
					showOriginFamily
					showHexagramName
					showBranches
					showElements
					showIndex
					showLabel
					showQuestionerAndQuestion
					showResultHexagram
					showHiddenRelative
					showSixCreatures
					showSixRelatives
					upper={7}
					lower={8}
					actives={[5]}
				/>
				<Hexagram
					showOriginFamily
					showHexagramName
					showBranches
					showElements
					showIndex
					showLabel
					showQuestionerAndQuestion
					showResultHexagram
					showHiddenRelative
					showSixCreatures
					showSixRelatives
					upper={3}
					lower={8}
					actives={[4]}
				/>
				<Hexagram
					showOriginFamily
					showHexagramName
					showBranches
					showElements
					showIndex
					showLabel
					showQuestionerAndQuestion
					showResultHexagram
					showHiddenRelative
					showSixCreatures
					showSixRelatives
					upper={3}
					lower={1}
					actives={[1, 2, 3]}
				/> */}
			</div>

			<article className="container prose mx-auto max-w-3xl pb-6 dark:prose-invert">
				<MDXContent code={post.body} />
				{post.lastUpdated && <PostLastUpdated date={post.lastUpdated} />}
			</article>
		</div>
	)
}
/*
i 0 1 2 3 4 5
q 6 5 4 3 2 1
*/

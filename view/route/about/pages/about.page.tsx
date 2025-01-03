import { notFound } from 'next/navigation'
import React from 'react'

import { pages } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import { Element } from '@/components/commons/mdx/custom-components/yi-jing/element'
import Hexagram from '@/components/commons/mdx/custom-components/yi-jing/hexagram'
import { formatDate } from '@/lib/utils'
import PageTitle from '@/view/components/blog-content/page-title'

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
			<Hexagram upper={8} lower={1} actives={[1, 2, 5]} />
			<Element type={1} />
			<article className="container prose mx-auto max-w-3xl pb-6 dark:prose-invert">
				<MDXContent code={post.body} />
				{post.lastUpdated && (
					<div className="text-right text-sm">Last updated:&nbsp;{formatDate(post.lastUpdated)}</div>
				)}
			</article>
		</div>
	)
}

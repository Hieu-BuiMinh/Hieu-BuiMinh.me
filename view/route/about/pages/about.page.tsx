import { notFound } from 'next/navigation'
import React from 'react'

import { pages } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import PageTitle from '@/view/components/blog-content/page-title'

const title = 'About'
const description = '👋 Hi there! I am Hieu, a student who loves web development.'

export default function AboutPageView() {
	const post = pages.find((post) => post.slugAsParams === 'about')

	if (!post || !post.published) {
		notFound()
	}

	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />
			<article className="container prose mx-auto max-w-3xl pb-6 dark:prose-invert">
				<MDXContent code={post.body} />
			</article>
		</div>
	)
}

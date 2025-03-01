import { Tag } from 'lucide-react'
import type { Metadata } from 'next'
import React from 'react'

import PageTitle from '@/view/components/blog-content/page-title'

export const metadata: Metadata = {
	title: 'Tags',
	description: `A place to explore the things I'm passionate about and love sharing ❤️`,
}

const title = '# Tags'
const description = `Explore a world of inspiration through my tags!`

function TagsLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="m-auto min-h-[50vh] max-w-screen-lg p-3 md:px-10 md:py-6">
			<PageTitle
				title={title}
				description={description}
				blurImageSrc="/assets/images/background/tags-header-blur-bg.svg"
				icon={Tag}
			/>

			{children}
		</div>
	)
}

export default TagsLayout

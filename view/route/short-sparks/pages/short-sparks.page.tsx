'use client'

import '../style.css'

import { notFound, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { Suspense } from 'react'

import { pages } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import VideoZoom from '@/components/commons/video/video-zoom'
import PageTitle from '@/view/components/blog-content/page-title'
import PostLastUpdated from '@/view/components/blog-content/post-last-updated'

const title = 'Short Sparks'
const description = `Some videos that I really enjoy and find inspiring. This is is where I share these little bursts motivation, hoping they'll spark something in you too 🌟.`

export default function ShortSparksPageView() {
	const searchParams = useSearchParams()

	const post = pages.find((post) => post.slugAsParams === 'short-sparks')

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [spark, setSpark] = useQueryState('spark', { defaultValue: '' })

	const handleUpdateSearchParam = ({ videoId, isOpen }: { videoId: string; isOpen: boolean }) => {
		if (!videoId) return
		if (isOpen) {
			setSpark(videoId)
		} else {
			setSpark('')
		}
	}

	const shortSparksList = [
		{
			name: 'Life Changing Advice',
			id: 'jim-rohn-life-changing-advice',
			src: '/assets/videos/motivation/jim-rohn/life-changing-advice.mp4',
			height: 200,
			previewImage: 'https://i.imgur.com/bS1Y4A9.png',
			description: 'Work harder on yourself ❤️',
		},
		{
			name: 'Why Not?',
			id: 'jim-rohn-why-not',
			src: '/assets/videos/motivation/jim-rohn/why-not.mp4',
			height: 300,
			previewImage: 'https://i.imgur.com/DlOd62I.png',
			description: 'Why not?',
		},
		{
			name: 'You Are What You Think About',
			id: 'luke-belmar-you-are-what-you-think-about',
			src: '/assets/videos/motivation/luke belmar/you-are-what-are-you-think-about.mp4',
			height: 250,
			previewImage: 'https://i.imgur.com/1rCkZWY.png',
			description: 'You are what you think about',
		},
	]

	if (!post || !post.published) {
		notFound()
	}

	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />

			<Suspense fallback={<div>Loading...</div>}>
				<article className="container prose mx-auto max-w-full pb-6 dark:prose-invert">
					<MDXContent code={post.body} />
					<div className="not-prose short-sparks-masonry">
						{shortSparksList.map((video) => (
							<VideoZoom
								key={video.id}
								height={video.height}
								width={200}
								previewImage={video.previewImage}
								src={video.src}
								description={video.description}
								previewImageClassName={`short-sparks-masonry-item h-[${video.height || 100}px]`}
								onOpenChangeCallback={(_open: boolean) =>
									handleUpdateSearchParam({ isOpen: _open, videoId: video.id })
								}
								open={video.id === searchParams.get('spark')}
								allowSharing
							/>
						))}
					</div>
					{post.lastUpdated && <PostLastUpdated date={post.lastUpdated} />}
				</article>
			</Suspense>
		</div>
	)
}

'use client'

import '../style.css'

import { notFound, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'

import { pages } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import VideoZoom from '@/components/commons/video/video-zoom'
import PageTitle from '@/view/components/blog-content/page-title'
import PostLastUpdated from '@/view/components/blog-content/post-last-updated'
import { shortSparksList } from '@/view/route/short-sparks/data'

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

	if (!post || !post.published) {
		notFound()
	}

	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />

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
							className={`short-sparks-masonry-item h-[${video.height || 100}px]`}
							previewImageClassName={`h-[${video.height || 100}px]`}
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
		</div>
	)
}

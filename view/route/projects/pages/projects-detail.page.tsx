import { notFound } from 'next/navigation'

import type { ProjectPost } from '@/.velite'
import { projects } from '@/.velite'
import { MDXContent } from '@/components/commons/mdx'
import { DesktopTableOfContent, MobileTableOfContent } from '@/components/commons/table-of-content'
import CommentSection from '@/view/components/blog-content/comments'
import PostLastUpdated from '@/view/components/blog-content/post-last-updated'
import PostLikeButton from '@/view/components/blog-content/post-like-button'
import ProjectLink from '@/view/route/projects/components/project-link'

interface PostPageProps {
	params: Promise<{ slug: string[] }>
}

async function getPostFromParams(params: PostPageProps['params']) {
	const resolvedParams = await params
	const slug = resolvedParams.slug.join('/')
	const post = projects.find((post: ProjectPost) => post.slugAsParams === slug)

	return post
}

export default async function ProjectsDetailPageView({ params }: PostPageProps) {
	const post: ProjectPost = await getPostFromParams(params)

	if (!post || !post.published) {
		notFound()
	}

	return (
		<>
			<div className="flex gap-3 pb-4">
				<ProjectLink title="Demo" url={post?.links?.demoUrl} />
				<ProjectLink title="Repo" url={post?.links?.repoUrl} />
			</div>
			<div className="relative flex justify-between gap-10">
				<article className="prose max-w-full dark:prose-invert lg:max-w-[calc(100%-220px)]">
					<MDXContent code={post.body} />

					{post.lastUpdated && <PostLastUpdated date={post.lastUpdated} />}
				</article>

				<aside className="hidden lg:block lg:w-[220px]">
					<div className="sticky top-16 z-10 flex flex-col gap-4">
						<DesktopTableOfContent post={post} />
						<PostLikeButton post={post} />
					</div>
				</aside>

				<div className="fixed bottom-12 right-2 z-20 lg:hidden">
					<div className="flex flex-col items-end gap-2">
						<PostLikeButton post={post} />
						<MobileTableOfContent post={post} />
					</div>
				</div>
			</div>
			{/* User comments */}
			<CommentSection post={post} />
		</>
	)
}

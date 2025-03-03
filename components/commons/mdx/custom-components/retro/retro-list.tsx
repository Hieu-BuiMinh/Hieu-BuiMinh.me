import { retros } from '@/.velite'
import RetroCard from '@/components/commons/mdx/custom-components/retro/retro-card'
import { sortPostsByDate } from '@/lib/content/posts'

function RetroList() {
	const retroPosts = sortPostsByDate(retros, 'asc')

	return (
		<div className="relative flex flex-col gap-6">
			<div
				data-orientation="vertical"
				role="none"
				className="absolute left-8 top-0 h-full w-px shrink-0 bg-muted"
			/>
			{retroPosts.map((post) => {
				return <RetroCard key={post.id} post={post} />
			})}
		</div>
	)
}

export default RetroList

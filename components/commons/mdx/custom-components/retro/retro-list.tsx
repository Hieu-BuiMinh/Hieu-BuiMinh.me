import { retros } from '@/.velite'
import RetroCard from '@/components/commons/mdx/custom-components/retro/retro-card'
import { sortPostsByDate } from '@/lib/content/posts'

function RetroList() {
	const retroPosts = sortPostsByDate(retros, 'asc')

	return (
		<div>
			{retroPosts.map((post) => {
				return <RetroCard key={post.id} post={post} />
			})}
		</div>
	)
}

export default RetroList

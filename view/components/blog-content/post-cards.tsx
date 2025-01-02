import type { DevBlogPost, DocPost, InterestPost } from '@/.velite'
import { PostCard } from '@/view/components/blog-content/post-card'

type PostCardsProps = {
	posts: DevBlogPost[] | InterestPost[] | DocPost[]
}

const PostCards = ({ posts }: PostCardsProps) => {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<PostCard key={post.slug} post={post} />
			))}
		</div>
	)
}

export default PostCards

import { docs } from '@/.velite'
import type { DocPost } from '#site/content'

export function findAllPostInDocsBySinglePost(post: DocPost) {
	const rootPost = docs.find((p) => p.id === (post.type === 'ROOT' ? post.id : post.root))
	const allChildrenPosts = rootPost ? docs.filter((p) => p.root === rootPost.id) : []

	return [rootPost, ...allChildrenPosts]
}

export function docPostsHierarchy(posts: DocPost[]) {}

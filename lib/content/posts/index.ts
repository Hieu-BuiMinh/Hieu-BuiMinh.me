import slug from 'slug'

import type { DevBlogPost, DocPost, InterestPost } from '#site/content'

export function sortPostsByDate(
	posts: Array<DevBlogPost | InterestPost | DocPost>,
	order: 'asc' | 'desc' = 'asc'
): Array<DevBlogPost | InterestPost | DocPost> {
	return posts.sort((a, b) => {
		const dateA = new Date(a.date).getTime()
		const dateB = new Date(b.date).getTime()

		if (order === 'asc') {
			return dateA - dateB // Sort in ascending order
		} else if (order === 'desc') {
			return dateB - dateA // Sort in descending order
		} else {
			throw new Error("Invalid order parameter. Use 'asc' for ascending or 'desc' for descending.")
		}
	})
}

export function getAllTags(posts: Array<DevBlogPost | InterestPost | DocPost>) {
	const tags: Record<string, number> = {}

	posts.forEach((post) => {
		if (post.published) {
			post.hashTags?.tags?.forEach((tag: string) => {
				tags[tag] = (tags[tag] ?? 0) + 1
			})
		}
	})

	return tags
}

export function sortTagsByCount(tags: Record<string, number>) {
	return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function getPostsByTagSlug(posts: Array<DevBlogPost | InterestPost | DocPost>, tag: string) {
	return posts.filter((post) => {
		if (!post.hashTags?.tags) return false
		const slugifiedTags = post.hashTags?.tags.map((tag: string) => slug(tag))
		return slugifiedTags.includes(tag)
	})
}

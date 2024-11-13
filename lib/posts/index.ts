import slug from 'slug'

import type { DevBlog } from '#site/content'

export function sortPosts(posts: Array<DevBlog>) {
	return posts.sort((a, b) => {
		if (a.date > b.date) return -1
		if (a.date < b.date) return 1
		return 0
	})
}

export function getAllTags(posts: Array<DevBlog>) {
	const tags: Record<string, number> = {}
	posts.forEach((post) => {
		if (post.published) {
			post.tags?.forEach((tag: string) => {
				tags[tag] = (tags[tag] ?? 0) + 1
			})
		}
	})

	return tags
}

export function sortTagsByCount(tags: Record<string, number>) {
	return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function getPostsByTagSlug(posts: Array<DevBlog>, tag: string) {
	return posts.filter((post) => {
		if (!post.tags) return false
		const slugifiedTags = post.tags.map((tag: string) => slug(tag))
		return slugifiedTags.includes(tag)
	})
}

import { docs } from '@/.velite'
import type { DocPost } from '#site/content'

export function findAllChildPostsInDocs(post: DocPost) {
	const isRoot = post.type === 'ROOT'
	const allChildrenPosts = isRoot ? docs.filter((p) => p.root === post.id) : docs.filter((p) => p.root === post.root)

	return allChildrenPosts
}

export function docPostsHierarchy(posts: DocPost[], slug: string) {
	// create a map to store each item by its ID
	const map = new Map()

	posts.forEach((item) => {
		map.set(item.id, {
			id: item.id,
			title: item.title,
			href: item.slug,
			parent: item.parent,
			children: [],
			active: item.slugAsParams === slug,
		}) // add empty `children` array for each item
	})

	const hierarchy: (DocPost & { children: DocPost[] })[] = []

	posts.forEach((item) => {
		if (item.parent) {
			const parent = map.get(item.parent)
			if (parent) {
				parent.children.push(map.get(item.id)) // add the current item as a child of its `parent`
			} else {
				hierarchy.push(map.get(item.id)) // if no `parent` found, this is a `parent` element itself
			}
		} else {
			// if no `parent` field exists, treat it as a top-level item
			hierarchy.push(map.get(item.id))
		}
	})

	console.log(hierarchy)

	return hierarchy
}

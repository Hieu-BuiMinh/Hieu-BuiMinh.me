import { defineTable } from 'convex/server'
import { v } from 'convex/values'

import type { Doc } from '../../convex/_generated/dataModel'

const post = defineTable({
	slug: v.string(),
	likes: v.array(v.object({ userId: v.string(), count: v.number() })),
	views: v.number(),
	comments: v.array(
		v.object({
			userId: v.string(),
			content: v.string(),
			commentId: v.string(),
			parentId: v.optional(v.string()),
			likes: v.number(),
			disLikes: v.number(),
			creationTime: v.string(),
		})
	),
}).index('by_slug', ['slug'])

export default post
export type DocPost = Doc<'post'>

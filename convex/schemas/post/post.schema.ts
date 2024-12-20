import { defineTable } from 'convex/server'
import { v } from 'convex/values'

const post = defineTable({
	slug: v.string(),
	likes: v.optional(v.number()),
	views: v.optional(v.number()),
	comments: v.optional(
		v.array(
			v.object({
				userId: v.string(),
				content: v.string(),
				commentId: v.string(),
				parentId: v.optional(v.string()),
			})
		)
	),
})

export default post

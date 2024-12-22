import { defineTable } from 'convex/server'
import { v } from 'convex/values'

const guestbookComment = defineTable({
	userId: v.string(),
	message: v.optional(v.string()),
	date: v.string(),
})

export default guestbookComment

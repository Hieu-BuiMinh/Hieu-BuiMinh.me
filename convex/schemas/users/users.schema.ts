import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const users = defineTable({
	email: v.string(),
	name: v.string(),
	avatar: v.string(),
	userId: v.string(),
	tokenIdentifier: v.string(),
})
	.index('by_user_id', ['userId'])
	.index('by_token', ['tokenIdentifier'])

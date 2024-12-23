import { defineTable } from 'convex/server'
import { v } from 'convex/values'

import type { Doc } from '../_generated/dataModel'

const users = defineTable({
	email: v.string(),
	name: v.string(),
	avatar: v.string(),
	userId: v.string(),
	tokenIdentifier: v.string(),
})
	.index('by_user_id', ['userId'])
	.index('by_token', ['tokenIdentifier'])

export default users

export type DocUsers = Doc<'users'>

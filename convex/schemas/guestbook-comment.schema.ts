import { defineTable } from 'convex/server'
import { v } from 'convex/values'

import type { Doc } from '../_generated/dataModel'

const guestbookComment = defineTable({
	userId: v.string(),
	message: v.optional(v.string()),
	date: v.string(),
})

export default guestbookComment

export type DocGuestbookComment = Doc<'guestbookComment'>

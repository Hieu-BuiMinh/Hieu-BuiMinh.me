import { mutationGeneric, queryGeneric } from 'convex/server'
import { v } from 'convex/values'

export const getAllComments = queryGeneric({
	handler: async (ctx) => {
		const guestbookComments = await ctx.db.query('guestbookCommentSchema').collect()

		return guestbookComments.sort((a, b) => a.date - b.date)
	},
})

export const createComment = mutationGeneric({
	args: {
		message: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()

		if (!identity) {
			throw new Error('Not authenticated')
		}

		const userId = identity.subject

		const guestbookComment = await ctx.db.insert('guestbookCommentSchema', {
			userId: userId,
			date: new Date().toISOString(),
			message: args.message,
		})

		return guestbookComment
	},
})

import { mutationGeneric, queryGeneric } from 'convex/server'
import { v } from 'convex/values'

export const getAllComments = queryGeneric({
	handler: async (ctx) => {
		const guestbookComments = await ctx.db.query('guestbookCommentSchema').collect()
		const users = await ctx.db.query('users').collect()

		return Promise.all(
			guestbookComments.map(async (message) => {
				const user = users.find((u) => u.userId === message.userId)
				return {
					author: user?.name ?? 'Anonymous',
					avatar: user?.avatar,
					...message,
				}
			})
		)
	},
})

export const createComment = mutationGeneric({
	args: {
		message: v.string(),
	},
	handler: async (ctx, args) => {
		// check if user log in
		const identity = await ctx.auth.getUserIdentity()

		if (!identity) {
			throw new Error('Not authenticated')
		}

		// check if user is on the database
		const user = await ctx.db
			.query('users')
			.withIndex('by_user_id', (q) => q.eq('userId', identity.subject)) // subject === userId
			.unique()

		if (!user) {
			throw new Error('Unauthenticated call to send message')
		}

		const guestbookComment = await ctx.db.insert('guestbookCommentSchema', {
			userId: user.userId,
			date: new Date().toISOString(),
			message: args.message,
		})

		return guestbookComment
	},
})

export const deleteComment = mutationGeneric({
	args: { id: v.id('guestbookCommentSchema') },
	handler: async (ctx, args) => {
		// check if user log in
		const identity = await ctx.auth.getUserIdentity()

		if (!identity) {
			throw new Error('Not authenticated')
		}

		const userId = identity.subject

		const existingComment = await ctx.db.get(args.id)

		if (!existingComment) {
			throw new Error('Not found')
		}

		if (existingComment.userId !== userId) {
			throw new Error('Unauthorized')
		}

		const comment = ctx.db.delete(args.id)

		return comment
	},
})

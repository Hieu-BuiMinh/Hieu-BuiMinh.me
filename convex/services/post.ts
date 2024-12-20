import { mutationGeneric } from 'convex/server'
import { v } from 'convex/values'

export const createPost = mutationGeneric({
	args: {
		slug: v.string(),
	},
	handler: (ctx, args) => {
		const post = ctx.db.insert('post', { slug: args.slug })
		return post
	},
})

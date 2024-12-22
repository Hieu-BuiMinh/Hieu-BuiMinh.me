import { mutationGeneric, queryGeneric } from 'convex/server'
import { v } from 'convex/values'

export const createPost = mutationGeneric({
	args: {
		slug: v.string(),
	},
	handler: async (ctx, args) => {
		if (args.slug === '') return null

		const post = await ctx.db.insert('post', {
			slug: args.slug,
			likes: [{ userId: 'Anonymous', count: 0 }],
			views: 0,
			comments: [],
		})
		return post
	},
})

export const getPostBySlug = queryGeneric({
	args: { slug: v.string() },
	handler: async (ctx, args) => {
		if (args.slug === '') return null

		const post = await ctx.db
			.query('post')
			.withIndex('by_slug', (q) => q.eq('slug', args.slug))
			.unique()

		return post
	},
})

export const updatePostView = mutationGeneric({
	args: {
		id: v.id('post'),
	},
	handler: async (ctx, args) => {
		if (args.id === '') return null

		const existPost = await ctx.db.get(args.id)

		if (!existPost) return null

		const post = await ctx.db.patch(args.id, { views: existPost.views + 1 })

		return post
	},
})

export const updatePostLikes = mutationGeneric({
	args: {
		id: v.id('post'),
	},
	handler: async (ctx, args) => {
		if (!args.id) return
		// check if user log in
		const identity = await ctx.auth.getUserIdentity()

		const existPost = await ctx.db.get(args.id)

		if (!existPost) return null

		// update Anonymous likes
		if (!identity) {
			const likeAnonymousIndex = existPost.likes.findIndex(
				(like: { userId: string }) => like?.userId === 'Anonymous'
			)
			existPost.likes[likeAnonymousIndex].count += 1
			const post = await ctx.db.patch(args.id, { likes: existPost.likes })
			return post
		}

		// update current user likes
		const likeIndex = existPost.likes.findIndex((like: { userId: string }) => like?.userId === identity.subject)

		if (likeIndex === -1) {
			existPost?.likes.push({ userId: identity.subject, count: 1 })
		} else {
			existPost.likes[likeIndex].count += 1
		}

		const post = await ctx.db.patch(args.id, { likes: existPost.likes })

		return post
	},
})

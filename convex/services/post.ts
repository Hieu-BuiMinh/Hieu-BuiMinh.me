import { mutationGeneric, queryGeneric } from 'convex/server'
import { v } from 'convex/values'
import { nanoid } from 'nanoid'

import type { DocPost } from '../schemas/post.schema'

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
	handler: async (ctx, args): Promise<DocPost | null> => {
		if (args.slug === '') return null

		const post: DocPost = await ctx.db
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
	handler: async (ctx, args): Promise<DocPost | null> => {
		if (args.id === '') return null

		const existPost = await ctx.db.get(args.id)

		if (!existPost) return null

		await ctx.db.patch(args.id, { views: existPost.views + 1 })

		return existPost
	},
})

export const updatePostLikes = mutationGeneric({
	args: {
		id: v.id('post'),
	},
	handler: async (ctx, args): Promise<DocPost | null> => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		if (!args.id) null
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

			await ctx.db.patch(args.id, { likes: existPost.likes })

			return existPost
		}

		// update current user likes
		const likeIndex = existPost.likes.findIndex((like: { userId: string }) => like?.userId === identity.subject)

		if (likeIndex === -1) {
			existPost?.likes.push({ userId: identity.subject, count: 1 })
		} else {
			existPost.likes[likeIndex].count += 1
		}

		await ctx.db.patch(args.id, { likes: existPost.likes })

		return existPost
	},
})

export const postComment = mutationGeneric({
	args: { id: v.id('post'), message: v.string(), parentId: v.optional(v.string()) },
	handler: async (ctx, args): Promise<DocPost | null> => {
		if (!args.id) return null

		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new Error('Not authenticated')
		}
		const userId = identity.subject

		const existPost: DocPost = await ctx.db.get(args.id)

		if (!existPost) return null

		existPost?.comments.push({
			commentId: nanoid(),
			content: args.message,
			userId: userId,
			parentId: args.parentId,
			likes: [],
			disLikes: [],
			creationTime: new Date().toISOString(),
		})

		await ctx.db.patch(args.id, { comments: existPost.comments })
		return existPost
	},
})

export const deletePostComment = mutationGeneric({
	args: { postId: v.id('post'), commentId: v.string() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()

		if (!identity) {
			throw new Error('Not authenticated')
		}

		const userId = identity.subject
		const user = await ctx.db
			.query('users')
			.withIndex('by_user_id', (q) => q.eq('userId', identity.subject)) // subject === userId
			.unique()

		const existingPost: DocPost = await ctx.db.get(args.postId)

		if (!existingPost) return

		const existingCommentIndex = existingPost.comments.findIndex((c) => c.commentId === args.commentId)

		if (existingCommentIndex === -1) return

		const commentToDelete = existingPost.comments[existingCommentIndex]

		if (user.role !== 'AUTHOR' && existingPost.comments[existingCommentIndex].userId !== userId) {
			throw new Error('Unauthorized')
		}

		// Recursive function to collect all comments to delete
		const collectChildComments = (commentId: string): DocPost['comments'] => {
			const childComments = existingPost.comments.filter((comment) => comment.parentId === commentId)

			return childComments.reduce<DocPost['comments']>(
				(acc, child) => acc.concat(child, collectChildComments(child.commentId)),
				[]
			)
		}

		// Collect all comments to delete
		const commentsToDelete = [commentToDelete, ...collectChildComments(args.commentId)]

		// Filter out the comments to delete
		existingPost.comments = existingPost.comments.filter(
			(comment) => !commentsToDelete.some((delComment) => delComment.commentId === comment.commentId)
		)

		await ctx.db.patch(existingPost._id, { comments: existingPost.comments })

		return existingPost
	},
})

export const interactComment = mutationGeneric({
	args: {
		postId: v.id('post'),
		commentId: v.string(),
		type: v.union(v.literal('LIKE'), v.literal('DISLIKE')),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()

		if (!identity) {
			throw new Error('Not authenticated')
		}

		const userId = identity.subject

		const existingPost: DocPost = await ctx.db.get(args.postId)

		if (!existingPost) return

		const commentIndex = existingPost.comments.findIndex((comment) => comment.commentId === args.commentId)

		if (commentIndex === -1) {
			throw new Error('Comment not found')
		}

		const comment = existingPost.comments[commentIndex]

		if (args.type === 'LIKE') {
			if (comment.likes.includes(userId)) {
				comment.likes = comment.likes.filter((id) => id !== userId)
			} else {
				comment.likes.push(userId)
				comment.disLikes = comment.disLikes.filter((id) => id !== userId)
			}
		} else if (args.type === 'DISLIKE') {
			if (comment.disLikes.includes(userId)) {
				comment.disLikes = comment.disLikes.filter((id) => id !== userId)
			} else {
				comment.disLikes.push(userId)
				comment.likes = comment.likes.filter((id) => id !== userId)
			}
		}

		existingPost.comments[commentIndex] = comment

		await ctx.db.patch(args.postId, {
			comments: existingPost.comments,
		})

		return { success: true }
	},
})

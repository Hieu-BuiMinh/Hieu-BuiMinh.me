import { mutationGeneric } from 'convex/server'

export const store = mutationGeneric({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity()
		console.log(identity)
		if (!identity) {
			throw new Error('Called storeUser without authentication present')
		}

		// Check if we've already stored this identity before.
		// Note: If you don't want to define an index right away, you can use
		// ctx.db.query("users")
		//  .filter(q => q.eq(q.field("by_token"), identity.tokenIdentifier))
		//  .unique();
		const user = await ctx.db
			.query('users')
			.withIndex('by_user_id', (q) => q.eq('userId', identity.subject)) // subject === userId
			.unique()
		if (user !== null) {
			// If we've seen this identity before but the name has changed, patch the value.
			if (user.name !== identity.name) {
				await ctx.db.patch(user._id, { name: identity.name })
			}
			return user._id
		}
		// If it's a new identity, create a new `User`.
		return await ctx.db.insert('users', {
			name: identity.name || identity.givenName || identity.email || 'Anonymous',
			email: identity.email,
			avatar: identity.pictureUrl,
			userId: identity.subject,
			tokenIdentifier: identity.tokenIdentifier,
		})
	},
})

import type { User } from '@clerk/clerk-sdk-node'
import { clerkClient } from '@clerk/clerk-sdk-node'

import { query } from './_generated/server'

export const getAllUsers = query(async () => {
	const a = await clerkClient
	const users = await a.users.getUserList()
	return users.data.map((user: User) => ({
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.emailAddresses[0]?.emailAddress,
	}))
})

import { useUser } from '@clerk/clerk-react'
import { useConvexAuth, useQuery } from 'convex/react'
import { useMutation } from 'convex/react'
import { useEffect, useState } from 'react'

import { api } from '../convex/_generated/api'
import type { Id } from '../convex/_generated/dataModel'

export function useStoreUserEffect() {
	const { isLoading, isAuthenticated } = useConvexAuth()
	const { user } = useUser()
	const users = useQuery(api.services.users.getAllUsers)
	const adminIds = users?.filter((u) => u.role === 'AUTHOR').map((u) => u.userId)
	const isAuthor = adminIds?.includes(user?.id || '')
	// When this state is set we know the server
	// has stored the user.
	const [userId, setUserId] = useState<Id<'users'> | null>(null)
	const storeUser = useMutation(api.services.users.store)
	useEffect(() => {
		if (!isAuthenticated) {
			return
		}
		async function createUser() {
			const id = await storeUser()
			setUserId(id)
		}
		createUser()
		return () => setUserId(null)

		// eslint-disable-next-line @tanstack/query/no-unstable-deps
	}, [isAuthenticated, storeUser, user?.id])

	return {
		isLoading: isLoading || (isAuthenticated && userId === null),
		isAuthenticated: isAuthenticated && userId !== null,
		isAuthor: !!isAuthor,
	}
}

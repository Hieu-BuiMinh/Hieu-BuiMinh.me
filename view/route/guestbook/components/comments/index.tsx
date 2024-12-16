'use client'

import './style.css'

import { useQuery } from 'convex/react'

import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { range } from '@/utils/range'

function Comments() {
	const data = useQuery(api.guestbookComment.getAllComments)

	// const users = useQuery(api.users.getAllUsers)

	// console.log(users)

	if (data !== undefined) {
		return (
			<div className="masonry mt-4">
				{range(30).map((_, index) => (
					<div key={index} className="masonry-item">
						<div className="flex items-center space-x-4 rounded-lg border p-4 shadow-sm dark:bg-zinc-900/30">
							<Skeleton className="size-12 shrink-0 rounded-full" />
							<div className="w-full space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-1/2" />
							</div>
						</div>
					</div>
				))}
			</div>
		)
	}

	return <div className="">Comments</div>
}

export default Comments

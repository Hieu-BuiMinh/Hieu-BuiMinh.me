'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

interface IPostPaginationProps {
	totalPages: number
	className?: string
}

function PostPagination({ totalPages, className }: IPostPaginationProps) {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const currentPage = Number(searchParams.get('page')) || 1

	const prevPage = currentPage - 1
	const nextPage = currentPage + 1

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', pageNumber.toString())
		return `${pathname}?${params.toString()}`
	}

	useEffect(() => {
		Array(totalPages)
			.fill('')
			.map((_, index) => {
				createPageURL(index + 1)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Pagination className={className}>
			<PaginationContent>
				{prevPage >= 1 ? (
					<PaginationItem>
						<PaginationPrevious href={createPageURL(prevPage)} />
					</PaginationItem>
				) : null}

				{Array(totalPages)
					.fill('')
					.map((_, index) => (
						<PaginationItem className="hidden sm:inline-block" key={`page-button-${index}`}>
							<PaginationLink isActive={currentPage === index + 1} href={createPageURL(index + 1)}>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}

				{nextPage <= totalPages ? (
					<PaginationItem>
						<PaginationNext href={createPageURL(nextPage)} />
					</PaginationItem>
				) : null}
			</PaginationContent>
		</Pagination>
	)
}

export default PostPagination

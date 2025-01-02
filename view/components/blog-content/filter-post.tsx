'use client'

import React, { useState } from 'react'

import type { DevBlogPost, DocPost, InterestPost } from '@/.velite'
import { Input } from '@/components/ui/input'

type FilteredPostsProps = {
	posts: DevBlogPost[] | InterestPost[] | DocPost[]
}

function FilterPosts(props: FilteredPostsProps) {
	const { posts } = props
	const [searchValue, setSearchValue] = useState('')

	const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))

	return (
		<div>
			<Input
				type="text"
				value={searchValue}
				onChange={(e) => {
					setSearchValue(e.target.value)
				}}
				placeholder="Search articles"
				aria-label="Search articles"
				className="w-full pl-12"
				id="search"
			/>
		</div>
	)
}

export default FilterPosts

import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllTags, sortTagsByCount } from '@/lib/posts'
import { PostItem } from '@/view/marketing/blog/components/post-item'
import { Tag } from '@/view/marketing/blog/components/tag'
import { posts } from '#site/content'

function BlogPage() {
	const tags = getAllTags(posts)
	const sortedTags = sortTagsByCount(tags)

	return (
		<div className="container max-w-4xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block text-4xl font-black lg:text-5xl">Blog</h1>
					<p className="text-md text-muted-foreground">My ramblings on all things web dev.</p>
				</div>

				<div className="mt-8 grid grid-cols-12 gap-3">
					<hr />
					<div className="col-span-12 col-start-1 sm:col-span-8">
						{posts?.length > 0 ? (
							<ul className="flex flex-col">
								{posts.map((post) => {
									const { slug, date, title, description, tags } = post
									return (
										<li key={slug}>
											<PostItem
												slug={slug}
												date={date}
												title={title}
												description={description}
												tags={tags}
											/>
										</li>
									)
								})}
							</ul>
						) : (
							<p>Nothing to see here yet</p>
						)}
					</div>
					<Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
						<CardHeader>
							<CardTitle>Tags</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-wrap gap-2">
							{sortedTags?.map((tag) => <Tag tag={tag} key={tag} count={tags[tag]} />)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default BlogPage

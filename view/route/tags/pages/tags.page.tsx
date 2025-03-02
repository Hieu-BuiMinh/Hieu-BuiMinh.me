import { devBlogPosts, docs, interests, retros } from '@/.velite'
import { Tag } from '@/view/components/blog-content/tag'

const findAllTagsFormPosts = () => {
	const devPosts = devBlogPosts
	const docPosts = docs.filter((p) => p.type !== 'ROOT')
	const interestPosts = interests.filter((p) => p.type !== 'ROOT')
	const retroPosts = retros

	return [...devPosts, ...docPosts, ...interestPosts, ...retroPosts]
}
const getAllTagsFromPosts = (hashTagsList: { hashTags: { category: string; tags: string[] } }[]) => {
	const categoryTagCounts: Record<string, Record<string, number>> = {}

	hashTagsList.forEach((entry) => {
		const { category, tags } = entry?.hashTags
		if (!categoryTagCounts[category]) {
			categoryTagCounts[category] = {}
		}
		tags.forEach((tag) => {
			if (!categoryTagCounts[category][tag]) {
				categoryTagCounts[category][tag] = 0
			}
			categoryTagCounts[category][tag]++
		})
	})

	const result = Object.entries(categoryTagCounts).map(([category, tags]) => ({
		category,
		tags: Object.entries(tags).map(([name, amount]) => ({ name, amount })),
	}))

	return result
}

function TagsPageView() {
	const hashTagsList: { hashTags: { category: string; tags: string[] } }[] = findAllTagsFormPosts().map((post) => {
		return { hashTags: post.hashTags }
	})
	const tagsObject = getAllTagsFromPosts(hashTagsList)

	return (
		<div className="m-auto flex max-w-screen-lg flex-col gap-5 py-5">
			{tagsObject.map((categoryObj) => (
				<div key={categoryObj.category}>
					<h2 className="mb-2 py-1 text-lg font-bold">Category: {categoryObj.category}</h2>
					<div className="flex gap-3">
						{categoryObj.tags.map((tag) => (
							<Tag tag={tag.name} count={tag.amount} key={tag.name} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default TagsPageView

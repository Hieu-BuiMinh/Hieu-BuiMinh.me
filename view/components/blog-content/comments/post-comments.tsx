'use client'

import { useQuery } from 'convex/react'
import { Loader } from 'lucide-react'

import { api } from '@/convex/_generated/api'
import type { DocPost } from '@/convex/schemas/post.schema'
import { useCommentSectionContext } from '@/view/components/blog-content/comments'
import PostComment from '@/view/components/blog-content/comments/post-comment'

function createHierarchy(comments: DocPost['comments']) {
	const commentMap: Record<string, DocPost['comments'][number] & { children: DocPost['comments'][number][] }> = {}

	comments.forEach((comment) => {
		commentMap[comment.commentId] = { ...comment, children: [] }
	})

	const hierarchy: DocPost['comments'] = []

	comments.forEach((comment) => {
		if (comment.parentId) {
			const parent = commentMap[comment.parentId]
			if (parent) {
				parent.children.push(commentMap[comment.commentId])
			}
		} else {
			// if the comment has no parent, it's a top-level comment
			hierarchy.push(commentMap[comment.commentId])
		}
	})

	// sort top-level comments by creation time
	hierarchy.sort((a, b) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime())

	return hierarchy
}

function PostComments() {
	const { post } = useCommentSectionContext()

	const postBySlug = useQuery(api.services.post.getPostBySlug, { slug: post?.slugAsParams })

	const createHierarchyComment = createHierarchy(postBySlug?.comments || [])

	if (!postBySlug) {
		return null
	}

	if (!postBySlug.comments || postBySlug.comments.length === 0) {
		return (
			<div className="mt-5 flex h-32 items-center justify-center space-y-4 rounded-lg border">
				<div className="flex flex-col items-center justify-center gap-3">
					<span className="text-sm text-muted-foreground">Be the first to comment on this post</span>
					<span className="text-sm text-muted-foreground">(❁´◡`❁)</span>
				</div>
			</div>
		)
	}

	return (
		<div className="mt-5 flex flex-col space-y-4 rounded-lg border p-4">
			{createHierarchyComment?.map((comment) => <PostComment comment={comment} key={comment.commentId} />)}
		</div>
	)
}

export default PostComments

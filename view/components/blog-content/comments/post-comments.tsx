'use client'

import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { useCommentSectionContext } from '@/view/components/blog-content/comments'
import PostComment from '@/view/components/blog-content/comments/post-comment'

function PostComments() {
	const { post } = useCommentSectionContext()

	const postBySlug = useQuery(api.services.post.getPostBySlug, { slug: post?.slugAsParams })

	return <div>{postBySlug?.comments.map((comment) => <PostComment comment={comment} key={comment.commentId} />)}</div>
}

export default PostComments

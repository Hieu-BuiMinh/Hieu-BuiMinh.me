'use client'

import { useMutation, useQuery } from 'convex/react'
import { toast } from 'sonner'
import type { z } from 'zod'

import { api } from '@/convex/_generated/api'
import { useCommentSectionContext } from '@/view/components/blog-content/comments'
import type { TPostCommentFromSchemaType } from '@/view/components/blog-content/comments/comment-editor'
import CommentEditor from '@/view/components/blog-content/comments/comment-editor'

function PostCommentForm() {
	const { post } = useCommentSectionContext()

	const postBySlug = useQuery(api.services.post.getPostBySlug, { slug: post?.slugAsParams })
	const mutatePostComment = useMutation(api.services.post.postComment)

	const onSubmitcallback = (data: z.infer<TPostCommentFromSchemaType>) => {
		if (!postBySlug?._id) return

		const promise = mutatePostComment({ id: postBySlug._id, message: data.message })
		toast.promise(promise, {
			success: 'Comment posted!',
			loading: 'Posting comment',
			error: 'Failed to post comment',
		})
	}

	return <CommentEditor onSubmitcallback={onSubmitcallback} />
}

export default PostCommentForm

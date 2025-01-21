'use client'

import { useMutation, useQuery } from 'convex/react'
import DOMPurify from 'dompurify'
import React from 'react'
import { toast } from 'sonner'
import type { z } from 'zod'

import { api } from '@/convex/_generated/api'
import type { DocPost } from '@/convex/schemas/post.schema'
import { useStoreUserEffect } from '@/hooks/use-store-user-effect'
import { useCommentSectionContext } from '@/view/components/blog-content/comments'
import type { TPostCommentFromSchemaType } from '@/view/components/blog-content/comments/comment-editor'
import CommentEditor from '@/view/components/blog-content/comments/comment-editor'

function CommentReply({ comment }: { comment: DocPost['comments'][number] }) {
	const { isAuthenticated, isLoading } = useStoreUserEffect()
	const { post } = useCommentSectionContext()

	const postBySlug = useQuery(api.services.post.getPostBySlug, { slug: post?.slugAsParams })
	const mutatePostComment = useMutation(api.services.post.postComment)

	const onSubmitcallback = (data: z.infer<TPostCommentFromSchemaType>) => {
		if (!isAuthenticated) {
			toast.warning('You need to login to reply this comment!')
			return
		}
		if (isLoading) {
			toast.warning(`We're authenticating, just wait amoment!`)
			return
		}

		if (!postBySlug?._id) return

		const sanitizedMessage = DOMPurify.sanitize(data.message).trim()

		if (!sanitizedMessage && sanitizedMessage === '') return

		const promise = mutatePostComment({
			id: postBySlug._id,
			message: sanitizedMessage,
			parentId: comment.commentId,
		})
		toast.promise(promise, {
			success: 'Reply posted!',
			loading: 'Posting reply',
			error: 'Failed to post your reply',
		})
	}

	return <CommentEditor isAuthenticated={true} onSubmitcallback={onSubmitcallback} />
}

export default CommentReply

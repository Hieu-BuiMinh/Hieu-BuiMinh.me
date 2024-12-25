'use client'

import { useMutation, useQuery } from 'convex/react'
import DOMPurify from 'dompurify'
import { toast } from 'sonner'
import type { z } from 'zod'

import { api } from '@/convex/_generated/api'
import { useStoreUserEffect } from '@/hooks/useStoreUserEffect'
import { useCommentSectionContext } from '@/view/components/blog-content/comments'
import type { TPostCommentFromSchemaType } from '@/view/components/blog-content/comments/comment-editor'
import CommentEditor from '@/view/components/blog-content/comments/comment-editor'

function PostCommentForm() {
	const { isAuthenticated } = useStoreUserEffect()
	const { post } = useCommentSectionContext()

	const postBySlug = useQuery(api.services.post.getPostBySlug, { slug: post?.slugAsParams })
	const mutatePostComment = useMutation(api.services.post.postComment)

	const onSubmitcallback = (data: z.infer<TPostCommentFromSchemaType>) => {
		if (!isAuthenticated) {
			toast.warning('You need to login to post this comment!')
			return
		}
		if (!postBySlug?._id) return

		const sanitizedMessage = DOMPurify.sanitize(data.message)

		const promise = mutatePostComment({ id: postBySlug._id, message: sanitizedMessage })

		return promise
	}

	return <CommentEditor onSubmitcallback={onSubmitcallback} />
}

export default PostCommentForm

'use client'

import React, { createContext, useContext } from 'react'

import type { DevBlogPost, DocPost, InterestPost } from '@/.velite'
import PostCommentForm from '@/view/components/blog-content/comments/post-comment-form'
import PostComments from '@/view/components/blog-content/comments/post-comments'

type TCommentSectionContextValue = { post: DevBlogPost | DocPost | InterestPost }

const CommentSectionContext = createContext<TCommentSectionContextValue | undefined>(undefined)

export const useCommentSectionContext = () => {
	const context = useContext(CommentSectionContext)

	if (context === undefined) {
		throw new Error('useCommentSectionContext must be use inside CommentSectionProvider.')
	}

	return context
}

function CommentSectionProvider({ post, children }: TCommentSectionContextValue & { children: React.ReactNode }) {
	const defaultValue = { post }
	return <CommentSectionContext.Provider value={defaultValue}>{children}</CommentSectionContext.Provider>
}

const CommentSection = ({ post }: TCommentSectionContextValue) => {
	return (
		<CommentSectionProvider post={post}>
			<div className="mt-5">
				<PostCommentForm />
				<PostComments />
			</div>
		</CommentSectionProvider>
	)
}

export default CommentSection

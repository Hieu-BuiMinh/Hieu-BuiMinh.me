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
	// if (!post) {
	// 	return (
	// 		<div className="flex items-center justify-center gap-3">
	// 			<Loader className="animate-spin" size={20} />
	// 			<span className="text-sm text-muted-foreground">Loading comments...</span>
	// 		</div>
	// 	)
	// }

	return (
		<CommentSectionProvider post={post}>
			<PostCommentForm />
			<PostComments />
		</CommentSectionProvider>
	)
}

export default CommentSection

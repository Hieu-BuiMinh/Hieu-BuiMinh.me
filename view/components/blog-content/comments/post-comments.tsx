'use client'

import { useQuery } from 'convex/react'
import { Loader } from 'lucide-react'

import { api } from '@/convex/_generated/api'
import { useCommentSectionContext } from '@/view/components/blog-content/comments'
import PostComment from '@/view/components/blog-content/comments/post-comment'

function PostComments() {
	const { post } = useCommentSectionContext()

	const postBySlug = useQuery(api.services.post.getPostBySlug, { slug: post?.slugAsParams })

	if (!postBySlug) {
		return (
			<div className="mt-5 flex h-32 items-center justify-center space-y-4 rounded-lg border">
				<div className="flex items-center justify-center gap-3">
					<Loader className="animate-spin" size={20} />
					<span className="text-sm text-muted-foreground">Loading comments...</span>
				</div>
			</div>
		)
	}

	if (!postBySlug.comments || postBySlug.comments.length === 0) {
		return (
			<div className="mt-5 flex h-32 items-center justify-center space-y-4 rounded-lg border">
				<div className="flex items-center justify-center gap-3">
					<span className="text-sm text-muted-foreground">Be the first to comment on this post</span>
					<span className="text-sm text-muted-foreground">(❁´◡`❁)</span>
				</div>
			</div>
		)
	}

	return (
		<div className="mt-5 space-y-4 rounded-lg border">
			{postBySlug?.comments.map((comment) => <PostComment comment={comment} key={comment.commentId} />)}
		</div>
	)
}

export default PostComments

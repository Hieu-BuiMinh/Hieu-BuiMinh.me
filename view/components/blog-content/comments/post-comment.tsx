'use client'

import React from 'react'

import type { DocPost } from '@/convex/schemas/post.schema'

function PostComment({ comment }: { comment: DocPost['comments'][number] }) {
	return <div>{comment.content}</div>
}

export default PostComment

import React from 'react'

function BlogLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto max-w-screen-lg p-3 md:px-10 md:py-6">{children}</div>
}

export default BlogLayout

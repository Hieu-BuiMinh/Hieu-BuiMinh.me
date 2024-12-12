import React from 'react'

function DocLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto max-w-screen-2xl">{children}</div>
}

export default DocLayout

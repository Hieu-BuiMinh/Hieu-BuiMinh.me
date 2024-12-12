import React from 'react'

function DocLayout({ children }: { children: React.ReactNode }) {
	console.log('layout rerender 1')

	return <div className="m-auto max-w-screen-2xl">{children}</div>
}

export default DocLayout

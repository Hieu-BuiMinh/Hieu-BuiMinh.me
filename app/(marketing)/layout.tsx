import React from 'react'

function MarketingLayout({ children }: { children: React.ReactNode }) {
	return <div className="m-auto max-w-screen-md p-3 md:px-10 md:py-6">{children}</div>
}

export default MarketingLayout

import React from 'react'

function MarketingLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative h-[calc(100vh-57px)] overflow-hidden">
			<div className="absolute left-0 top-0 size-full bg-[url('/assets/images/background/blur-bg.png')] bg-[120px] bg-repeat opacity-[0.075]" />
			{children}
		</div>
	)
}

export default MarketingLayout

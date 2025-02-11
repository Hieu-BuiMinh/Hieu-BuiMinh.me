import React from 'react'

function MarketingLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<div className="absolute left-0 top-0 z-[1] size-full bg-[url('/assets/images/background/landing-noise.png')] bg-repeat " />
			<div className="relative z-[2]">{children}</div>
		</div>
	)
}

export default MarketingLayout

import React from 'react'

import SiteFooter from '@/components/commons/site-footer'

function MarketingLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<div className="absolute left-0 top-0 z-[1] size-full bg-[url('/assets/images/background/blur-bg.png')] bg-[120px] bg-repeat opacity-[0.04]" />
			<div className="relative z-[2]">{children}</div>

			<SiteFooter />
		</div>
	)
}

export default MarketingLayout

import { ChevronLeft } from 'lucide-react'
import React from 'react'

interface IDivinationByFlippingCointsPageView {
	resetDivinationType: () => void
}
function DivinationByFlippingCointsPageView({ resetDivinationType }: IDivinationByFlippingCointsPageView) {
	return (
		<div>
			<div
				className="flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
				onClick={resetDivinationType}
			>
				<ChevronLeft /> <span>Back</span>
			</div>

			<div className="mt-4">DivinationByFlippingCointsPageView</div>
		</div>
	)
}

export default DivinationByFlippingCointsPageView

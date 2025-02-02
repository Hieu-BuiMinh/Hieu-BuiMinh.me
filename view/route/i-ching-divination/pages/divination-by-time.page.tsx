import { ChevronLeft } from 'lucide-react'
import React from 'react'

interface IDivinationByTimePageView {
	resetDivinationType: () => void
}

function DivinationByTimePageView({ resetDivinationType }: IDivinationByTimePageView) {
	return (
		<div>
			<div
				className="flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
				onClick={resetDivinationType}
			>
				<ChevronLeft /> <span>Back</span>
			</div>

			<div className="mt-4">DivinationByTimePageView</div>
		</div>
	)
}

export default DivinationByTimePageView

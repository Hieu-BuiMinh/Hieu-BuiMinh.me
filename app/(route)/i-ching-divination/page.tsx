import { Loader } from 'lucide-react'
import { Suspense } from 'react'

import IChingDivinationPageView from '@/view/route/i-ching-divination/pages/i-ching-divination.page'

function IChingDivination() {
	return (
		<Suspense
			fallback={
				<div className="flex w-full items-center justify-center">
					<Loader size={20} className="animate-spin" />
				</div>
			}
		>
			<IChingDivinationPageView />
		</Suspense>
	)
}

export default IChingDivination

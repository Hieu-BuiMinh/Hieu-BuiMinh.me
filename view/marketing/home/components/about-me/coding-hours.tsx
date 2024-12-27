import NumberFlow from '@number-flow/react'
import { Hourglass } from 'lucide-react'
import { Suspense } from 'react'

export function CodingHours() {
	return (
		<div className="group flex size-full flex-col justify-between p-4 lg:p-6">
			<span className="flex items-center gap-2 text-xs text-foreground md:text-base">
				<Hourglass size={20} />
				<span>Codding hours</span>
			</span>
			<p className="font-title flex w-full grow items-center justify-center truncate text-4xl font-semibold text-foreground md:text-3xl lg:text-4xl [@media(max-width:450px)]:py-8">
				<Suspense fallback="-- hrs">
					<NumberFlow
						willChange
						value={3250}
						suffix="hrs"
						format={{ trailingZeroDisplay: 'stripIfInteger' }}
					/>
				</Suspense>
			</p>
			<span />
		</div>
	)
}

// async function CodingHoursValue() {
// 	const data = await getCodingTime()

// 	if (data === null) {
// 		return '--'
// 	}

// 	return `${Math.round(data.seconds / 60 / 60)} hrs`
// }

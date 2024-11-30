import { Hourglass } from 'lucide-react'
import { Suspense } from 'react'

export function CodingHours() {
	return (
		<div className="group flex size-full flex-col justify-between p-4 lg:p-6">
			<span className="flex items-center gap-2 text-xs text-foreground/50 transition-all group-hover:text-foreground md:text-base">
				<Hourglass size={20} />
				<span>Codding hours</span>
			</span>
			<p className="font-title flex grow items-center justify-center lg:text-4xl text-4xl font-semibold text-foreground/50 w-full transition-colors group-hover:text-foreground md:text-3xl truncate [@media(max-width:450px)]:py-8">
				<Suspense fallback="-- hrs">3.250 hrs</Suspense>
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

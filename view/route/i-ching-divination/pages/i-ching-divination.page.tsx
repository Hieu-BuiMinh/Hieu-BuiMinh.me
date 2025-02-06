'use client'

import { CalendarClock, Dices, DraftingCompass, type LucideIcon } from 'lucide-react'
import { useQueryState } from 'nuqs'
import React from 'react'

import DivinationByFlippingCointsPageView from '@/view/route/i-ching-divination/pages/divination-by-flipping-coints.page'
import DivinationByTimePageView from '@/view/route/i-ching-divination/pages/divination-by-time.page'

function IChingDivinationPageView() {
	const [divinationtype, setDivinationType] = useQueryState('divination-type', { defaultValue: '' })

	const onDivinationChange = (type: string) => {
		setDivinationType(type)
	}
	const onResetDivination = () => {
		setDivinationType('')
	}

	if (divinationtype === 'by-time') {
		return <DivinationByTimePageView resetDivinationType={onResetDivination} />
	}
	if (divinationtype === 'by-fipping-coints') {
		return <DivinationByFlippingCointsPageView resetDivinationType={onResetDivination} />
	}

	return (
		<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
			<Card
				title="Giờ động tâm"
				onClick={() => {
					onDivinationChange('by-time')
				}}
				description="Chọn Ngày giờ trước khi lập quẻ 🌞"
				icon={CalendarClock}
			/>
			<Card
				title="Gieo xu"
				onClick={() => {
					onDivinationChange('by-fipping-coints')
				}}
				description="Cứ vào và tung xu 6 lần thôi, còn lại cứ để vũ trụ lo hết. Blink blink 🪙✨"
				icon={Dices}
			/>
			<Card
				title="Tự an quẻ"
				onClick={() => {
					onDivinationChange('by-fipping-coints')
				}}
				description="..."
				icon={DraftingCompass}
			/>
		</div>
	)
}

export default IChingDivinationPageView

const Card = (props: { icon: LucideIcon; title: string; description: string; onClick?: () => void }) => {
	const { description, icon: Icon, title, onClick } = props
	return (
		<div
			onClick={onClick}
			className="bg-[linear-gradient(180deg,#ffffff,#fbfbfb 65.62%)] col-span-1 cursor-pointer rounded-lg border p-4 text-foreground shadow transition-colors hover:bg-muted-foreground/5 dark:bg-[linear-gradient(180deg,#1e1e1e,#121212)]"
		>
			<div className="not-prose mb-2 w-fit rounded-md border bg-muted p-1.5 text-muted-foreground">
				<Icon />
			</div>
			<h3 className="not-prose mb-1 text-sm font-medium capitalize">{title}</h3>
			<div className="prose-no-margin mt-2 text-sm text-muted-foreground">
				<p>{description}</p>
			</div>
		</div>
	)
}

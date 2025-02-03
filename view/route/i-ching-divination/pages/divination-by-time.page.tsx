'use client'

import { ChevronLeft } from 'lucide-react'
import { LunarDate, SolarDate } from 'lunar-date-vn'
import { useState } from 'react'

import { DateTimePicker24h } from '@/components/commons/date-time-picker'
import { Button } from '@/components/ui/button'

interface IDivinationByTimePageView {
	resetDivinationType: () => void
}

function DivinationByTimePageView({ resetDivinationType }: IDivinationByTimePageView) {
	const [date, setDate] = useState<Date | undefined>(new Date())

	const solar_date = new SolarDate(new Date())
	// console.log(solar_date)
	// console.log(solar_date.toLunarDate())

	const lunar_date = new LunarDate({ day: 6, month: 1, year: 2025 })
	lunar_date.init() // initialize lunar_date before using
	// console.log('toSolarDate', lunar_date.toSolarDate())

	return (
		<div>
			<div
				className="flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
				onClick={resetDivinationType}
			>
				<ChevronLeft /> <span>Back</span>
			</div>

			<div className="mt-4 flex gap-3">
				<DateTimePicker24h width={240} dateValue={date} setDateValue={setDate} />
				<Button variant="outline">Lập quẻ</Button>
			</div>
		</div>
	)
}

export default DivinationByTimePageView

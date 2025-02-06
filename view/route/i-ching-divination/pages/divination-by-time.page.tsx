'use client'

import { format } from 'date-fns'
import { ChevronLeft } from 'lucide-react'
import { SolarDate } from 'lunar-date-vn'
import type { SetStateAction } from 'react'
import { useState } from 'react'

import { DateTimePicker24h } from '@/components/commons/date-time-picker'
import Hexagram from '@/components/commons/mdx/custom-components/yi-jing/hexagram'
import { Button } from '@/components/ui/button'
import Note from '@/view/route/i-ching-divination/components/note'
// import { SolarDate } from '@/lib/lunar-date'

interface IDivinationByTimePageView {
	resetDivinationType: () => void
}

function DivinationByTimePageView({ resetDivinationType }: IDivinationByTimePageView) {
	const [hexagramData, setHexagramData] = useState<{ upper: number; lower: number; active: number } | null>(null)
	const [date, setDate] = useState<Date>(new Date())

	const solar_date = new SolarDate(date)

	const lunar_date = solar_date.toLunarDate()

	const lunar_date_day = lunar_date?.get().day || 0
	const lunar_date_month = lunar_date?.get().month || 0
	const lunar_date_year = lunar_date?.get().year
	const lunar_date_yearIndex = lunar_date?.getYearIndex() || 0
	const lunar_date_hour = lunar_date?.get().hour || 0

	const lunar_date_day_name = lunar_date?.getDayName()
	const lunar_date_month_name = lunar_date?.getMonthName()
	const lunar_date_year_name = lunar_date?.getYearName()
	const lunar_date_solar_tearm = lunar_date?.getSolarTerm()
	const lunar_date_first_hour_name = lunar_date?.getFirstHourNameOfTheDay()
	const lunar_date_real_hour_name = lunar_date?.getRealHourName()

	const handleDateChange = (date: SetStateAction<Date>) => {
		setDate(date)
		setHexagramData(null)
	}

	const handleCalculatingHexagramData = () => {
		const upper = (lunar_date_yearIndex + lunar_date_month + lunar_date_day) % 8
		const lower = (lunar_date_yearIndex + lunar_date_month + lunar_date_day + lunar_date_hour) % 8
		const active = (lunar_date_yearIndex + lunar_date_month + lunar_date_day + lunar_date_hour) % 6

		setHexagramData({ upper, lower, active })
	}

	const handleResetHexagramData = () => {
		setHexagramData(null)
	}

	return (
		<div className="flex flex-col gap-4">
			<div
				className="flex w-fit cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
				onClick={resetDivinationType}
			>
				<ChevronLeft /> <span>Back</span>
			</div>

			<div className="flex justify-between">
				<div className="flex gap-3">
					<DateTimePicker24h width={240} dateValue={date} setDateValue={handleDateChange} />
					{!hexagramData && <Button onClick={handleCalculatingHexagramData}>Lập quẻ</Button>}
					{hexagramData && (
						<Button onClick={handleResetHexagramData} variant="destructive">
							Reset
						</Button>
					)}
				</div>
				<Note />
			</div>

			<div className="flex flex-col gap-2">
				<div className="text-center text-xs md:text-sm">
					Ngày: {format(date, 'dd/MM/yyyy | HH:mm')} dương lịch
				</div>
				<div className="text-center text-xs md:text-sm">
					Mùng: {format(new Date(`${lunar_date_month}/${lunar_date_day}/${lunar_date_year}`), 'dd/MM/yyyy')}
					{` | ${lunar_date_first_hour_name}`} âm lịch
				</div>
				<div className="text-center text-xs md:text-sm">
					{`Giờ: ${lunar_date_real_hour_name} - Ngày: ${lunar_date_day_name} - Tháng: ${lunar_date_month_name} - Năm: ${lunar_date_year_name} - Tiết: ${lunar_date_solar_tearm}`}
				</div>
			</div>

			{/* <Hexagram upper={7} lower={7} showSixRelatives showElements showSixCreatures showBranches /> */}

			{hexagramData && (
				<Hexagram
					upper={hexagramData.upper}
					lower={hexagramData.lower}
					actives={[hexagramData.active || 6]}
					showBranches
					showElements
					showHexagramName
					showHiddenRelative
					showIndex
					showLabel
					showOriginFamily
					showQuestionerAndQuestion
					showResultHexagram
					showSixCreatures
					showSixRelatives
				/>
			)}
		</div>
	)
}

export default DivinationByTimePageView

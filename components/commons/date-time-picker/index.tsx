'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { SetStateAction } from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import type { CalendarProps } from '@/components/ui/calendar'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type IDateTimePicker24h = {
	dateValue?: Date | undefined
	setDateValue?: (value: SetStateAction<Date>) => void
	width?: number
} & CalendarProps

export function DateTimePicker24h({ dateValue, setDateValue, width, ...props }: IDateTimePicker24h) {
	const [date, setDate] = useState<Date | undefined>(dateValue)
	const [isOpen, setIsOpen] = useState(false)

	const hours = Array.from({ length: 24 }, (_, i) => i)

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate)
			setDateValue?.(selectedDate)
		}
	}

	const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
		if (date) {
			const newDate = new Date(date)
			if (type === 'hour') {
				newDate.setHours(parseInt(value))
			} else if (type === 'minute') {
				newDate.setMinutes(parseInt(value))
			}
			setDate(newDate)
			setDateValue?.(newDate)
		}
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						'w-full justify-start text-left font-normal',
						width && `w-[${width}px]`,
						!date && 'text-muted-foreground'
					)}
				>
					<CalendarIcon className="mr-2 size-4" />
					{date ? format(date, 'dd/MM/yyyy HH:mm') : <span>DD/MM/YYYY hh:mm</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="center">
				<div className="sm:flex">
					<Calendar {...props} mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
					<div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
						<ScrollArea className="w-64 sm:w-auto">
							<div className="flex p-2 sm:flex-col">
								{hours.reverse().map((hour) => (
									<Button
										key={hour}
										size="icon"
										variant={date && date.getHours() === hour ? 'default' : 'ghost'}
										className="aspect-square shrink-0 sm:w-full"
										onClick={() => handleTimeChange('hour', hour.toString())}
									>
										{hour}
									</Button>
								))}
							</div>
							<ScrollBar orientation="horizontal" className="sm:hidden" />
						</ScrollArea>
						<ScrollArea className="w-64 sm:w-auto">
							<div className="flex p-2 sm:flex-col">
								{Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
									<Button
										key={minute}
										size="icon"
										variant={date && date.getMinutes() === minute ? 'default' : 'ghost'}
										className="aspect-square shrink-0 sm:w-full"
										onClick={() => handleTimeChange('minute', minute.toString())}
									>
										{minute.toString().padStart(2, '0')}
									</Button>
								))}
							</div>
							<ScrollBar orientation="horizontal" className="sm:hidden" />
						</ScrollArea>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}

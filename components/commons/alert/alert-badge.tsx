import type { LucideIcon } from 'lucide-react'
import { BadgeInfo, CircleCheckBig, Info, OctagonX, TriangleAlert } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

interface IAlertBadge {
	title?: string | React.ReactNode
	children?: string | React.ReactNode
	type?: 'info' | 'success' | 'warning' | 'error'
	icon?: LucideIcon
	className?: string
	fill?: boolean
}

const AlertBadge = ({ children, title, type, icon, className, fill }: IAlertBadge) => {
	let typeColor = ''
	let Icon = Info

	switch (type) {
		case 'success':
			typeColor = '34, 197, 94'
			Icon = icon || CircleCheckBig
			break
		case 'error':
			typeColor = '239, 68, 68'
			Icon = icon || OctagonX
			break
		case 'info':
			typeColor = '14, 165, 233'
			Icon = icon || Info
			break
		case 'warning':
			typeColor = '251, 191, 36'
			Icon = icon || TriangleAlert
			break

		default:
			typeColor = '37, 99, 235'
			Icon = icon || BadgeInfo
			break
	}
	return (
		<div
			style={{
				borderColor: `rgba(${typeColor})`,
				backgroundColor: `rgba(${typeColor}, ${fill ? '0.3' : '0.15'})`,
			}}
			className={cn(`not-prose w-full rounded-md border p-2`, fill && 'border-none', className)}
		>
			{title && (
				<div className="mb-0.5 flex items-center gap-3">
					<Icon size={18} stroke={`rgba(${typeColor})`} />
					<div className="text-sm font-medium text-foreground underline">{title}</div>
				</div>
			)}

			<div className="flex gap-3 text-sm text-foreground">
				{!title && <Icon size={18} stroke={`rgba(${typeColor})`} />}
				<div className="flex-1">{children}</div>
			</div>
		</div>
	)
}

export default AlertBadge

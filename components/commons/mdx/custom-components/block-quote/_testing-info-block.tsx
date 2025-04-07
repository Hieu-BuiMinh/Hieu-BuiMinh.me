import '../../style/info-block.css'

import { CircleCheckBig, Info, OctagonX, TriangleAlert } from 'lucide-react'

interface IInfoBlock {
	type: 'success' | 'error' | 'info' | 'warning'
}

// https://prnt.sc/eZhHU_Pv7Voo

const InfoBlock = ({ type }: IInfoBlock) => {
	let typeVariable = ''
	let Icon = Info

	switch (type) {
		case 'success':
			typeVariable = '34, 197, 94'
			Icon = CircleCheckBig
			break
		case 'error':
			typeVariable = '239, 68, 68'
			Icon = OctagonX
			break
		case 'info':
			typeVariable = '14, 165, 233'
			Icon = Info
			break
		case 'warning':
			typeVariable = '234, 179, 8'
			Icon = TriangleAlert
			break

		default:
			typeVariable = '191, 219, 254'
			Icon = Info
			break
	}

	return (
		<div style={{ '--info-block-primary-color': typeVariable } as React.CSSProperties} className="info-block">
			<Icon
				className="absolute left-2 top-2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full fill-green-500/15 text-green-500"
				size={22}
			/>

			<div className="z-20 pl-10 text-foreground">
				<div className="font-semibold">Title</div>
			</div>
			<div className="pl-4 pt-4 text-sm text-foreground">
				Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit
				quisque faucibus....
			</div>

			<div className="info-hidden" />
		</div>
	)
}

export default InfoBlock

// https://www.plantcss.com/blog/how-to-make-rounded-corners-when-using-css-clip-path
// https://plantcss.com/css-clip-path-converter

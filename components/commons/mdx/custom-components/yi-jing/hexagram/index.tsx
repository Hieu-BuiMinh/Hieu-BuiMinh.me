'use client'

import { nanoid } from 'nanoid'

import YinYang from '@/components/commons/mdx/custom-components/yi-jing/yin-yang'
import { converToHexagrams } from '@/lib/content/docs/hexgrams-converter'
import { cn } from '@/lib/utils'

interface IHexagram {
	upper?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	lower?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	actives?: number[]
	className?: string
	showLabel?: boolean
	showSixRelatives?: boolean
	showSixCreatures?: boolean
	yinYangClassName?: string
}

function Hexagram({
	actives,
	className,
	lower,
	showLabel,
	showSixCreatures,
	showSixRelatives,
	upper,
	yinYangClassName,
}: IHexagram) {
	const upperCoverted = converToHexagrams({ type: 'UPPER', baguaIndex: upper || 1 })
	const lowerCoverted = converToHexagrams({ type: 'LOWER', baguaIndex: lower || 1 })

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			<div className="flex flex-col gap-0.5">
				{upperCoverted?.value.map((item, i) => {
					return (
						<div className="flex items-center gap-2" key={nanoid()}>
							<YinYang
								className={yinYangClassName}
								type={item as 0 | 1}
								key={nanoid()}
								active={actives?.includes(upperCoverted.value.length - i + 3)}
							/>
							<span className="flex gap-1 text-xs">
								<span className="text-muted-foreground">{upperCoverted?.branch}</span>
								<span>{upperCoverted.creatures[i]}</span>
							</span>
						</div>
					)
				})}
			</div>
			<div className="flex flex-col gap-0.5">
				{lowerCoverted?.value.map((item, i) => {
					return (
						<div className="flex items-center gap-2" key={nanoid()}>
							<YinYang
								className={yinYangClassName}
								type={item as 0 | 1}
								key={nanoid()}
								active={actives?.includes(lowerCoverted.value.length - i)}
							/>
							<span className="flex gap-1 text-xs">
								<span className="text-muted-foreground">{lowerCoverted?.branch}</span>
								<span>{lowerCoverted.creatures[i]}</span>
							</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Hexagram

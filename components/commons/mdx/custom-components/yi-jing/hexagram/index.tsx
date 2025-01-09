'use client'

import { nanoid } from 'nanoid'

import type { ElementDotsTypeName } from '@/components/commons/mdx/custom-components/yi-jing/element/element-dots'
import ElementDot from '@/components/commons/mdx/custom-components/yi-jing/element/element-dots'
import YinYang from '@/components/commons/mdx/custom-components/yi-jing/yin-yang'
import type { ELEMENTS_TYPE } from '@/lib/content/docs/hexgrams-converter'
import { converToHexagrams, transformToBaguasData } from '@/lib/content/docs/hexgrams-converter'
import { cn } from '@/lib/utils'

interface IHexagram {
	upper?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	lower?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	actives?: number[]
	className?: string
	showIndex?: boolean
	showLabel?: boolean
	showElements?: boolean
	showSixRelatives?: boolean
	showBranches?: boolean
	showSixCreatures?: boolean
	yinYangClassName?: string
	sixRelativesCompareToElement?: ELEMENTS_TYPE
}

function Hexagram({
	actives, // danh sách các hào động : từ [1 => 6]
	className,
	upper, // quẻ thượng
	lower, // quẻ hạ
	showLabel, // hiện tên quẻ
	showIndex, // hiện thứ tự của từng hào
	showElements, // hiện ngũ hành của từng hào
	showBranches, // hiện thiên can
	showSixRelatives, // hiện lục thân của từng hào
	showSixCreatures, // hiện địa chi của từng hào
	yinYangClassName, // className của yinyang component
	sixRelativesCompareToElement, // dùng cho quẻ biến, so sánh ngũ hành của hào với ngũ hành của quẻ gốc
}: IHexagram) {
	const aboveActiveList = actives?.filter((e) => e > 3)?.map((e) => e - 3) // vị trí hào động của quẻ thượng [1,2,3]
	const belowActiveList = actives?.filter((e) => e < 4) // vị trí hào động của quẻ hạ [1,2,3]
	const isAboveActive = aboveActiveList && aboveActiveList?.length > 0
	const isBelowActive = belowActiveList && belowActiveList?.length > 0

	const { upperBaguaCoverted, lowerBaguaCoverted, relatives, family } = converToHexagrams({
		upper: upper || 1,
		lower: lower || 1,
		// elementToCompareWith: sixRelativesCompareToElement,
	})

	return (
		<div className={cn('flex flex-col gap-3', className)}>
			<div className="flex flex-col gap-1.5">
				{upperBaguaCoverted?.value.map((item, i) => {
					return (
						<div className="flex items-center gap-2" key={nanoid()}>
							<YinYang
								className={yinYangClassName}
								type={item as 0 | 1}
								key={nanoid()}
								active={actives?.includes(upperBaguaCoverted.value.length - i + 3)}
							/>
							{(showIndex || showBranches || showSixCreatures || showElements) && (
								<span className="flex gap-1 text-xs leading-3">
									{showIndex && (
										<span className="flex w-2 items-center text-muted-foreground">{6 - i}</span>
									)}
									{showBranches && (
										<span className="flex w-9 items-center text-muted-foreground">
											{upperBaguaCoverted?.branch}
										</span>
									)}
									{showSixCreatures && (
										<span className="flex w-9 items-center">{upperBaguaCoverted.creatures[i]}</span>
									)}
									{showElements && (
										<div className="flex w-5 items-center justify-start">
											<ElementDot
												className="size-2"
												type={upperBaguaCoverted.elements[i] as ElementDotsTypeName}
											/>
										</div>
									)}
									{showSixRelatives && (
										<span className="flex w-14 items-center">{relatives.upper?.[i]}</span>
									)}
								</span>
							)}
						</div>
					)
				})}
			</div>
			<div className="flex flex-col gap-1.5">
				{lowerBaguaCoverted?.value.map((item, i) => {
					return (
						<div className="flex items-center gap-2" key={nanoid()}>
							<YinYang
								className={yinYangClassName}
								type={item as 0 | 1}
								key={nanoid()}
								active={actives?.includes(lowerBaguaCoverted.value.length - i)}
							/>
							{(showIndex || showBranches || showSixCreatures || showElements) && (
								<span className="flex gap-1 text-xs leading-3">
									{showIndex && <span className="flex w-2 gap-1 text-muted-foreground">{3 - i}</span>}
									{showBranches && (
										<span className="flex w-9 gap-1 text-muted-foreground">
											{lowerBaguaCoverted?.branch}
										</span>
									)}
									{showSixCreatures && (
										<span className="flex w-9 gap-1">{lowerBaguaCoverted.creatures[i]}</span>
									)}
									{showElements && (
										<div className="flex w-5 items-center justify-start">
											<ElementDot
												className="size-2"
												type={lowerBaguaCoverted.elements[i] as ElementDotsTypeName}
											/>
										</div>
									)}
									{showSixRelatives && (
										<span className="flex w-14 items-center">{relatives.lower?.[i]}</span>
									)}
								</span>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Hexagram

'use client'

import { nanoid } from 'nanoid'

import type { ElementDotsTypeName } from '@/components/commons/mdx/custom-components/yi-jing/element/element-dots'
import ElementDot from '@/components/commons/mdx/custom-components/yi-jing/element/element-dots'
import YinYang from '@/components/commons/mdx/custom-components/yi-jing/yin-yang'
import type { ELEMENTS_TYPE } from '@/lib/content/docs/hexgrams-converter'
import { converToHexagrams, transformActiveBaguaToNewBagua } from '@/lib/content/docs/hexgrams-converter'
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
	showOriginFamily?: boolean
	showResultHexagram?: boolean
	yinYangClassName?: string
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
	showOriginFamily, // hiện ngũ hành quẻ gốc
	showResultHexagram, // hiện kết quả sau khi động hào
	yinYangClassName, // className của yinyang component
}: IHexagram) {
	const aboveActiveList = actives?.filter((e) => e > 3)?.map((e) => e - 3) // vị trí hào động của quẻ thượng [6,5,4] => [3,2,1] => [1,2,3]
	const belowActiveList = actives?.filter((e) => e < 4) // vị trí hào động của quẻ hạ [1,2,3]
	const isAboveActive = aboveActiveList && aboveActiveList?.length > 0
	const isBelowActive = belowActiveList && belowActiveList?.length > 0

	const { upperBaguaCoverted, lowerBaguaCoverted, relatives, family } = converToHexagrams({
		upper: upper || 1,
		lower: lower || 1,
	})

	const newUpper = isAboveActive
		? transformActiveBaguaToNewBagua({ baguaIndex: upper || 1, actives: aboveActiveList }).newIndex
		: upper
	const newlower = isBelowActive
		? transformActiveBaguaToNewBagua({ baguaIndex: lower || 1, actives: belowActiveList }).newIndex
		: lower

	const {
		upperBaguaCoverted: newUpperBaguaCoverted,
		lowerBaguaCoverted: newLowerBaguaCoverted,
		relatives: newRelatives,
	} = converToHexagrams({
		upper: newUpper || 1,
		lower: newlower || 1,
		elementToCompareWith: family!.originElement as ELEMENTS_TYPE,
	})

	return (
		<div className="mx-auto my-9 flex gap-10">
			<div className={cn('relative flex flex-col gap-3', className)}>
				<span className="absolute -top-7 left-0 text-sm">{family?.vietnameseElementName}</span>
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
											<span className="flex w-9 items-center">
												{upperBaguaCoverted.creatures[i]}
											</span>
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
										{showIndex && (
											<span className="flex w-2 gap-1 text-muted-foreground">{3 - i}</span>
										)}
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

			{showResultHexagram && (
				<div className={cn('flex flex-col gap-3', className)}>
					<div className="flex flex-col gap-1.5">
						{newUpperBaguaCoverted?.value.map((item, i) => {
							return (
								<div className="flex items-center gap-2" key={nanoid()}>
									<YinYang
										className={yinYangClassName}
										type={item as 0 | 1}
										key={nanoid()}
										active={actives?.includes(newUpperBaguaCoverted.value.length - i + 3)}
									/>
									{(showIndex || showBranches || showSixCreatures || showElements) && (
										<span className="flex gap-1 text-xs leading-3">
											{showIndex && (
												<span className="flex w-2 items-center text-muted-foreground">
													{6 - i}
												</span>
											)}
											{showBranches && (
												<span className="flex w-9 items-center text-muted-foreground">
													{newUpperBaguaCoverted?.branch}
												</span>
											)}
											{showSixCreatures && (
												<span className="flex w-9 items-center">
													{newUpperBaguaCoverted.creatures[i]}
												</span>
											)}
											{showElements && (
												<div className="flex w-5 items-center justify-start">
													<ElementDot
														className="size-2"
														type={newUpperBaguaCoverted.elements[i] as ElementDotsTypeName}
													/>
												</div>
											)}
											{showSixRelatives && (
												<span className="flex w-14 items-center">
													{newRelatives.upper?.[i]}
												</span>
											)}
										</span>
									)}
								</div>
							)
						})}
					</div>
					<div className="flex flex-col gap-1.5">
						{newLowerBaguaCoverted?.value.map((item, i) => {
							return (
								<div className="flex items-center gap-2" key={nanoid()}>
									<YinYang
										className={yinYangClassName}
										type={item as 0 | 1}
										key={nanoid()}
										active={actives?.includes(newLowerBaguaCoverted.value.length - i)}
									/>
									{(showIndex || showBranches || showSixCreatures || showElements) && (
										<span className="flex gap-1 text-xs leading-3">
											{showIndex && (
												<span className="flex w-2 gap-1 text-muted-foreground">{3 - i}</span>
											)}
											{showBranches && (
												<span className="flex w-9 gap-1 text-muted-foreground">
													{newLowerBaguaCoverted?.branch}
												</span>
											)}
											{showSixCreatures && (
												<span className="flex w-9 gap-1">
													{newLowerBaguaCoverted.creatures[i]}
												</span>
											)}
											{showElements && (
												<div className="flex w-5 items-center justify-start">
													<ElementDot
														className="size-2"
														type={newLowerBaguaCoverted.elements[i] as ElementDotsTypeName}
													/>
												</div>
											)}
											{showSixRelatives && (
												<span className="flex w-14 items-center">
													{newRelatives.lower?.[i]}
												</span>
											)}
										</span>
									)}
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default Hexagram

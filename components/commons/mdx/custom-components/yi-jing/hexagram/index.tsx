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
	showQuestionerAndQuestion?: boolean
	showHiddenRelative?: boolean
	showHexagramName?: boolean
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
	showQuestionerAndQuestion, // hiện thế ứng
	showHiddenRelative, // hiện phục thần
	showHexagramName, //  hiện tên quẻ
	yinYangClassName, // className của yinyang component
}: IHexagram) {
	const showInforSection =
		showIndex || showBranches || showSixCreatures || showElements || showQuestionerAndQuestion || showHiddenRelative

	const aboveActiveList = actives?.filter((e) => e > 3)?.map((e) => e - 3) // vị trí hào động của quẻ thượng [6,5,4] => [3,2,1] => [1,2,3]
	const belowActiveList = actives?.filter((e) => e < 4) // vị trí hào động của quẻ hạ [1,2,3]
	const isAboveActive = aboveActiveList && aboveActiveList?.length > 0
	const isBelowActive = belowActiveList && belowActiveList?.length > 0

	const { upperBaguaCoverted, lowerBaguaCoverted, relatives, family, member, hiddenRelative } = converToHexagrams({
		upper: upper || 1,
		lower: lower || 1,
	})
	console.log('hiddenRelative', hiddenRelative.elements)

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
		family: newFamily,
		member: newMember,
	} = converToHexagrams({
		upper: newUpper || 1,
		lower: newlower || 1,
		elementToCompareWith: family!.originElement as ELEMENTS_TYPE,
	})

	return (
		<div className="mx-auto my-9 flex justify-between gap-20">
			<div className={cn('relative flex flex-col gap-3', className)}>
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
								{showInforSection && (
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
										{showQuestionerAndQuestion && (
											<div className="w-5">
												{6 - i === member?.questionerIndex && (
													<span className="text-center">[T]</span>
												)}
												{6 - i === member?.questionIndex && (
													<span className="text-center">[U]</span>
												)}
											</div>
										)}
										{showHiddenRelative && (
											<>
												{hiddenRelative.indexes.map((r, j) => {
													if (i === r) {
														return (
															<div key={nanoid()} className="flex items-center gap-1">
																<ElementDot
																	className="size-2"
																	type={hiddenRelative.elements[j] as ELEMENTS_TYPE}
																/>
																<span className="italic text-foreground/80">
																	{hiddenRelative.branches[j]}
																</span>
																<span className="italic text-foreground/80">
																	{hiddenRelative.creatures}
																</span>
																<span className="italic text-foreground/80">
																	{hiddenRelative.hiddenRelative}
																</span>
															</div>
														)
													}
												})}
											</>
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
								{showInforSection && (
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
										{showQuestionerAndQuestion && (
											<div className="w-5">
												{3 - i === member?.questionerIndex && (
													<span className="text-center">[T]</span>
												)}
												{3 - i === member?.questionIndex && (
													<span className="text-center">[U]</span>
												)}
											</div>
										)}
										{showHiddenRelative && (
											<>
												{hiddenRelative.indexes.map((r, j) => {
													if (i + 3 === r) {
														return (
															<div key={nanoid()} className="flex items-center gap-2">
																<ElementDot
																	className="size-2"
																	type={hiddenRelative.elements[j] as ELEMENTS_TYPE}
																/>
																<span className="italic text-foreground/80">
																	{hiddenRelative.branches[j]}
																</span>
																<span className="italic text-foreground/80">
																	{hiddenRelative.creatures[j]}
																</span>
																<span className="italic text-foreground/80">
																	{hiddenRelative.hiddenRelative}
																</span>
															</div>
														)
													}
												})}
											</>
										)}
									</span>
								)}
							</div>
						)
					})}
				</div>
				{showOriginFamily && <span className="text-sm">Cung: {family?.baguaFamily}</span>}
				{showHexagramName && <span className="font-semibold">{member?.hexagramName}</span>}
				{!!member?.wanderer && <span className="text-sm">Du hồn</span>}
				{!!member?.returner && <span className="text-sm">Quy hồn</span>}
			</div>

			{showResultHexagram && (
				<div className={cn('relative flex flex-col gap-3', className)}>
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
					{showOriginFamily && (
						<span className="text-sm text-muted-foreground/70">Cung: {newFamily?.baguaFamily}</span>
					)}
					{showHexagramName && <span className="font-semibold">{newMember?.hexagramName}</span>}
					{!!newMember?.wanderer && <span className="text-sm">Du hồn</span>}
					{!!newMember?.returner && <span className="text-sm">Quy hồn</span>}
				</div>
			)}
		</div>
	)
}

export default Hexagram

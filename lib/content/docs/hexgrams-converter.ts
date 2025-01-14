export interface HexgramBagua {
	creatures: string[]
	branch: string
	elements: ELEMENTS_TYPE[]
	value: number[]
	label: string
	index: number
}

export const converToHexagrams = ({
	upper,
	lower,
	elementToCompareWith,
}: {
	upper: number
	lower: number
	elementToCompareWith?: ELEMENTS_TYPE
}) => {
	// tìm 8 quái + tên riêng của 8 quái + ngũ hành của 3 hào trong mỗi quái
	const upperBaguaCoverted = transformToBaguasData({
		type: 'UPPER',
		baguaIndex: upper,
	})
	const lowerBaguaCoverted = transformToBaguasData({ type: 'LOWER', baguaIndex: lower })

	// tìm 8 họ nhà quái
	const family = hexagramFamily.find((f) => f.members.map((item) => item.value === `[${upper}, ${lower}]`))
	const member = family?.members.find((mem) => mem.value === `[${upper}, ${lower}]`)

	// originElement dùng để so sánh ngũ hành 6 hào với ngũ hành quẻ gốc
	// nhằm an đúng lục thân cho quẻ gốc và quẻ biến
	// nếu có `elementToCompareWith` chứng tỏ Hexagrams này là quẻ biến => so sánh 6 hào với ngũ hành của quẻ gốc biến ra nó
	// nếu không có `elementToCompareWith` thì Hexagrams này là quẻ gốc => so sánh 6 hào với ngũ hành của quẻ gốc của chính nó
	const originElement = elementToCompareWith ? elementToCompareWith : (family!.originElement as ELEMENTS_TYPE)

	// tìm lục thân
	const upperRelative =
		upperBaguaCoverted?.elements.map((element) => {
			return relativeConverter({ originElement, element })
		}) || []
	const lowerRelative =
		lowerBaguaCoverted?.elements.map((element) => {
			return relativeConverter({ originElement, element })
		}) || []

	// tìm phục thần
	const returningRelative = findReturningRelative({ allRelative: [...upperRelative, ...lowerRelative], family })
	console.log('returningRelative', returningRelative)

	return {
		upperBaguaCoverted,
		lowerBaguaCoverted,
		family,
		member,
		relatives: { upper: upperRelative, lower: lowerRelative },
		returningRelative,
	}
}

export const transformToBaguasData = ({
	type,
	baguaIndex,
}: {
	type: 'UPPER' | 'LOWER'
	baguaIndex: number
}): HexgramBagua | null => {
	let bagua = null
	let baguaWithData = null

	switch (baguaIndex) {
		case 0 || 8:
			bagua = { value: [0, 0, 0], label: 'Địa', index: 8 }
			break
		case 1 || 9:
			bagua = { value: [1, 1, 1], label: 'Thiên', index: 1 }
			break
		case 2:
			bagua = { value: [0, 1, 1], label: 'Trạch', index: 2 }
			break
		case 3:
			bagua = { value: [1, 0, 1], label: 'Hỏa', index: 3 }
			break
		case 4:
			bagua = { value: [0, 0, 1], label: 'Lôi', index: 4 }
			break
		case 5:
			bagua = { value: [1, 1, 0], label: 'Phong', index: 5 }
			break
		case 6:
			bagua = { value: [0, 1, 0], label: 'Thủy', index: 6 }
			break
		case 7:
			bagua = { value: [1, 0, 0], label: 'Sơn', index: 7 }
			break

		default:
			bagua = { value: [1, 1, 1], label: 'Thiên', index: 1 }
			break
	}

	if (type === 'UPPER') {
		switch (baguaIndex) {
			case 0:
			case 8:
				baguaWithData = {
					...bagua,
					creatures: ['Dậu', 'Hợi', 'Sửu'],
					branch: 'Quý',
					elements: ['Mental', 'Water', 'Earth'] as ELEMENTS_TYPE[],
				}
				break
			case 1:
			case 9:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Nhâm',
					elements: ['Earth', 'Mental', 'Fire'] as ELEMENTS_TYPE[],
				}
				break
			case 2:
				baguaWithData = {
					...bagua,
					creatures: ['Mùi', 'Dậu', 'Hợi'],
					branch: 'Đinh',
					elements: ['Earth', 'Mental', 'Water'] as ELEMENTS_TYPE[],
				}
				break
			case 3:
				baguaWithData = {
					...bagua,
					creatures: ['Tỵ', 'Mùi', 'Dậu'],
					branch: 'Kỹ',
					elements: ['Fire', 'Earth', 'Mental'] as ELEMENTS_TYPE[],
				}
				break
			case 4:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Canh',
					elements: ['Earth', 'Mental', 'Fire'] as ELEMENTS_TYPE[],
				}
				break
			case 5:
				baguaWithData = {
					...bagua,
					creatures: ['Mão', 'Tỵ', 'Mùi'],
					branch: 'Tân',
					elements: ['Wood', 'Fire', 'Earth'] as ELEMENTS_TYPE[],
				}
				break
			case 6:
				baguaWithData = {
					...bagua,
					creatures: ['Tý', 'Tuất', 'Thân'],
					branch: 'Mậu',
					elements: ['Water', 'Earth', 'Mental'] as ELEMENTS_TYPE[],
				}
				break
			case 7:
				baguaWithData = {
					...bagua,
					creatures: ['Dần', 'Tý', 'Tuất'],
					branch: 'Bính',
					elements: ['Wood', 'Water', 'Earth'] as ELEMENTS_TYPE[],
				}
				break

			default:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Nhâm',
					elements: ['Earth', 'Mental', 'Fire'] as ELEMENTS_TYPE[],
				}
				break
		}
	}

	if (type === 'LOWER') {
		switch (baguaIndex) {
			case 0:
			case 8:
				baguaWithData = {
					...bagua,
					creatures: ['Mão', 'Tỵ', 'Mùi'],
					branch: 'Ất',
					elements: ['Wood', 'Fire', 'Earth'] as ELEMENTS_TYPE[],
				}
				break
			case 1:
			case 9:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Giáp',
					elements: ['Earth', 'Wood', 'Water'] as ELEMENTS_TYPE[],
				}
				break
			case 2:
				baguaWithData = {
					...bagua,
					creatures: ['Sửu', 'Mão', 'Tỵ'],
					branch: 'Đinh',
					elements: ['Earth', 'Wood', 'Fire'] as ELEMENTS_TYPE[],
				}
				break
			case 3:
				baguaWithData = {
					...bagua,
					creatures: ['Hợi', 'Sửu', 'Mão'],
					branch: 'Kỹ',
					elements: ['Water', 'Earth', 'Wood'] as ELEMENTS_TYPE[],
				}
				break
			case 4:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Canh',
					elements: ['Earth', 'Wood', 'Water'] as ELEMENTS_TYPE[],
				}
				break
			case 5:
				baguaWithData = {
					...bagua,
					creatures: ['Dậu', 'Hợi', 'Sửu'],
					branch: 'Tân',
					elements: ['Mental', 'Water', 'Earth'] as ELEMENTS_TYPE[],
				}
				break
			case 6:
				baguaWithData = {
					...bagua,
					creatures: ['Ngọ', 'Thìn', 'Dần'],
					branch: 'Mậu',
					elements: ['Fire', 'Earth', 'Wood'] as ELEMENTS_TYPE[],
				}
				break
			case 7:
				baguaWithData = {
					...bagua,
					creatures: ['Thân', 'Ngọ', 'Thìn'],
					branch: 'Bính',
					elements: ['Mental', 'Fire', 'Earth'] as ELEMENTS_TYPE[],
				}
				break

			default:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Nhâm',
					elements: ['Earth', 'Wood', 'Water'] as ELEMENTS_TYPE[],
				}
				break
		}
	}

	return baguaWithData
}

export const transformActiveBaguaToNewBagua = ({
	baguaIndex,
	actives,
}: {
	baguaIndex: number
	actives: number[]
}): {
	value: number[]
	label: string
	newIndex: number
} => {
	let bagua = null

	switch (baguaIndex) {
		case 0 || 8:
			bagua = { value: [0, 0, 0], label: 'Địa', index: 8 }
			break
		case 1 || 9:
			bagua = { value: [1, 1, 1], label: 'Thiên', index: 1 }
			break
		case 2:
			bagua = { value: [0, 1, 1], label: 'Trạch', index: 2 }
			break
		case 3:
			bagua = { value: [1, 0, 1], label: 'Hỏa', index: 3 }
			break
		case 4:
			bagua = { value: [0, 0, 1], label: 'Lôi', index: 4 }
			break
		case 5:
			bagua = { value: [1, 1, 0], label: 'Phong', index: 5 }
			break
		case 6:
			bagua = { value: [0, 1, 0], label: 'Thủy', index: 6 }
			break
		case 7:
			bagua = { value: [1, 0, 0], label: 'Sơn', index: 7 }
			break

		default:
			bagua = { value: [1, 1, 1], label: 'Thiên', index: 1 }
			break
	}

	if (actives.length > 0) {
		const indicesSet = new Set(actives)
		const newValue = bagua.value.map((value, index) => {
			return indicesSet.has(3 - index) ? 1 - value : value
		})

		switch (JSON.stringify(newValue)) {
			case '[0,0,0]':
				bagua = { value: [0, 0, 0], label: 'Địa', index: 8 }
				console.log(bagua)
				break
			case '[1,1,1]':
				bagua = { value: [1, 1, 1], label: 'Thiên', index: 1 }
				break
			case '[0,1,1]':
				bagua = { value: [0, 1, 1], label: 'Trạch', index: 2 }
				break
			case '[1,0,1]':
				bagua = { value: [1, 0, 1], label: 'Hỏa', index: 3 }
				break
			case '[0,0,1]':
				bagua = { value: [0, 0, 1], label: 'Lôi', index: 4 }
				break
			case '[1,1,0]':
				bagua = { value: [1, 1, 0], label: 'Phong', index: 5 }
				break
			case '[0,1,0]':
				bagua = { value: [0, 1, 0], label: 'Thủy', index: 6 }
				break
			case '[1,0,0]':
				bagua = { value: [1, 0, 0], label: 'Sơn', index: 7 }
				break

			default:
				bagua = { value: [1, 1, 1], label: 'Thiên', index: 1 }
				break
		}
	}

	return { ...bagua, newIndex: bagua.index }
}

/*
const array = [
  [[1, 1], [1, 5], [1, 7], [1, 8], [5, 8], [7, 8], [3, 8], [3, 1]],
  [[2, 2], [2, 6], [2, 8], [2, 7], [6, 7], [8, 7], [4, 7], [4, 2]],
  [[3, 3], [3, 7], [3, 5], [3, 6], [7, 6], [5, 6], [1, 6], [1, 3]],
  [[4, 4], [4, 8], [4, 6], [4, 5], [8, 5], [6, 5], [2, 5], [2, 4]],
  [[5, 5], [5, 1], [5, 3], [5, 4], [1, 4], [3, 4], [7, 4], [7, 5]],
  [[6, 6], [6, 2], [6, 4], [6, 3], [2, 3], [4, 3], [8, 3], [8, 6]],
  [[7, 7], [7, 3], [7, 1], [7, 2], [3, 2], [1, 2], [5, 2], [5, 7]],
  [[8, 8], [8, 4], [8, 2], [8, 1], [4, 1], [2, 1], [6, 1], [6, 8]]
];
*/
const transformToHexagramsData = ({ upper, lower }: { upper: number; lower: number }) => {
	const inputUpperLower = [upper, lower]

	let hexagramData = null

	switch (JSON.stringify(inputUpperLower)) {
		case JSON.stringify([1, 1]):
			hexagramData = {
				order: [1, 1],
				name: 'Càn Vi Thiên',
				meaning: `Quẻ Thiên Vi Càn (hoặc Thuần Càn), hay được gọi là Quẻ Càn, là quẻ số 1 trong 64 Quẻ Kinh Dịch thuộc loại quẻ Đại Cát. Thuộc nhóm tượng quái Càn, Ngũ hành Kim. Bốn đức tính Nguyên, Hanh, Lợi, Trinh chỉ Càn và Khôn có nên chủ đạo làm điều thiện lớn. Quẻ Thuần Càn có 6 hào đều là hào dương. Hình dung tình trạng cương cường, sáng sủa cực độ. Dù mạnh mẽ nhưng không có tàn bạo, chính nghĩa của đạo Trời muôn vật che chở, giúp đời an dân. Việc nào xứng với việc đó, đều thuận.`,
			}
			break

		default:
			hexagramData = {}
			break
	}

	return hexagramData
}

export type ELEMENTS_TYPE = 'Water' | 'Fire' | 'Wood' | 'Mental' | 'Earth'
// export type HEXAGRAM_RELATIVE = 'Phụ mẫu' | 'Thế tài' | 'Tử tôn' | 'huynh đệ' | 'Quan quỷ'

const hexagramFamily = [
	{
		baguaFamily: 'Càn',
		originElement: 'Mental',
		vietnameseElementName: 'Kim',
		members: [
			{ value: '[1, 1]', questionerIndex: 6, questionIndex: 3 },
			{ value: '[1, 5]', questionerIndex: 1, questionIndex: 4 },
			{ value: '[1, 7]', questionerIndex: 2, questionIndex: 5 },
			{ value: '[1, 8]', questionerIndex: 3, questionIndex: 6 },
			{ value: '[5, 8]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[7, 8]', questionerIndex: 5, questionIndex: 2 },
			{ value: '[3, 8]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[3, 1]', questionerIndex: 3, questionIndex: 6 },
		],
		wandering: '[3, 8]',
		returning: '[3, 1]',
		originRelatives: ['Phụ mẫu', 'Huynh đệ', 'Quan quỷ', 'Phụ mẫu', 'Thê tài', 'Tử tôn'],
	},
	{
		baguaFamily: 'Đoài',
		originElement: 'Mental',
		vietnameseElementName: 'Kim',
		members: [
			{ value: '[2, 2]', questionerIndex: 6, questionIndex: 3 },
			{ value: '[2, 6]', questionerIndex: 1, questionIndex: 4 },
			{ value: '[2, 8]', questionerIndex: 2, questionIndex: 5 },
			{ value: '[2, 7]', questionerIndex: 3, questionIndex: 6 },
			{ value: '[6, 7]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[8, 7]', questionerIndex: 5, questionIndex: 2 },
			{ value: '[4, 7]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[4, 2]', questionerIndex: 3, questionIndex: 6 },
		],
		wandering: '[4, 7]',
		returning: '[4, 2]',
		originRelatives: ['Phụ mẫu', 'Huynh đệ', 'Tử tôn', 'Phụ mẫu', 'Thê tài', 'Quan quỷ'],
	},
	{
		baguaFamily: 'Ly',
		originElement: 'Fire',
		vietnameseElementName: 'Hỏa',
		members: [
			{ value: '[3, 3]', questionerIndex: 6, questionIndex: 3 },
			{ value: '[3, 7]', questionerIndex: 1, questionIndex: 4 },
			{ value: '[3, 5]', questionerIndex: 2, questionIndex: 5 },
			{ value: '[3, 6]', questionerIndex: 3, questionIndex: 6 },
			{ value: '[7, 6]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[5, 6]', questionerIndex: 5, questionIndex: 2 },
			{ value: '[1, 6]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[1, 3]', questionerIndex: 3, questionIndex: 6 },
		],
		wandering: '[1, 6]',
		returning: '[1, 3]',
		originRelatives: ['Quan quỷ', 'Phụ mẫu', 'Huynh đệ', 'Tử tôn', 'Phụ mẫu', 'Thê tài'],
	},
	{
		baguaFamily: 'Chấn',
		originElement: 'Wood',
		vietnameseElementName: 'Mộc',
		members: [
			{ value: '[4, 4]', questionerIndex: 6, questionIndex: 3 },
			{ value: '[4, 8]', questionerIndex: 1, questionIndex: 4 },
			{ value: '[4, 6]', questionerIndex: 2, questionIndex: 5 },
			{ value: '[4, 5]', questionerIndex: 3, questionIndex: 6 },
			{ value: '[8, 5]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[6, 5]', questionerIndex: 5, questionIndex: 2 },
			{ value: '[2, 5]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[2, 4]', questionerIndex: 3, questionIndex: 6 },
		],
		wandering: '[2, 5]',
		returning: '[2, 4]',
		originRelatives: ['Phụ mẫu', 'Huynh đệ', 'Quan quỷ', 'Phụ mẫu', 'Thê tài', 'Tử tôn'],
	},
	{
		baguaFamily: 'Tốn',
		originElement: 'Wood',
		vietnameseElementName: 'Mộc',
		members: [
			{ value: '[5, 5]', questionerIndex: 6, questionIndex: 3 },
			{ value: '[5, 1]', questionerIndex: 1, questionIndex: 4 },
			{ value: '[5, 3]', questionerIndex: 2, questionIndex: 5 },
			{ value: '[5, 4]', questionerIndex: 3, questionIndex: 6 },
			{ value: '[1, 4]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[3, 4]', questionerIndex: 5, questionIndex: 2 },
			{ value: '[7, 4]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[7, 5]', questionerIndex: 3, questionIndex: 6 },
		],
		wandering: '[7, 4]',
		returning: '[7, 5]',
		originRelatives: ['Thê tài', 'Quan quỷ', 'Phụ mẫu', 'Huynh đệ', 'Tử tôn', 'Phụ mẫu'],
	},
	{
		baguaFamily: 'Khảm',
		originElement: 'Water',
		vietnameseElementName: 'Thủy',
		members: [
			{ value: '[6, 6]', questionerIndex: 6, questionIndex: 3 },
			{ value: '[6, 2]', questionerIndex: 1, questionIndex: 4 },
			{ value: '[6, 4]', questionerIndex: 2, questionIndex: 5 },
			{ value: '[6, 3]', questionerIndex: 3, questionIndex: 6 },
			{ value: '[2, 3]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[4, 3]', questionerIndex: 5, questionIndex: 2 },
			{ value: '[8, 3]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[8, 6]', questionerIndex: 3, questionIndex: 6 },
		],
		wandering: '[8, 3]',
		returning: '[8, 6]',
		originRelatives: ['Tử tôn', 'Phụ mẫu', 'Huynh đệ', 'Quan quỷ', 'Phụ mẫu', 'Thê tài'],
	},
	{
		baguaFamily: 'Cấn',
		originElement: 'Earth',
		vietnameseElementName: 'Thổ',
		members: [
			{ value: '[7, 7]', questionerIndex: 6, questionIndex: 3 },
			{ value: '[7, 3]', questionerIndex: 1, questionIndex: 4 },
			{ value: '[7, 1]', questionerIndex: 2, questionIndex: 5 },
			{ value: '[7, 2]', questionerIndex: 3, questionIndex: 6 },
			{ value: '[3, 2]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[1, 2]', questionerIndex: 5, questionIndex: 2 },
			{ value: '[5, 2]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[5, 7]', questionerIndex: 3, questionIndex: 6 },
		],
		wandering: '[5, 2]',
		returning: '[5, 7]',
		originRelatives: ['Thê tài', 'Tử tôn', 'Phụ mẫu', 'Huynh đệ', 'Quan quỷ', 'Phụ mẫu'],
	},
	{
		baguaFamily: 'Khôn',
		originElement: 'Earth',
		vietnameseElementName: 'Thổ',
		members: [
			{ value: '[8, 8]', questionerIndex: 6, questionIndex: 3 },
			{ value: '[8, 4]', questionerIndex: 1, questionIndex: 4 },
			{ value: '[8, 2]', questionerIndex: 2, questionIndex: 5 },
			{ value: '[8, 1]', questionerIndex: 3, questionIndex: 6 },
			{ value: '[4, 1]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[2, 1]', questionerIndex: 5, questionIndex: 2 },
			{ value: '[6, 1]', questionerIndex: 4, questionIndex: 1 },
			{ value: '[6, 8]', questionerIndex: 3, questionIndex: 6 },
		],
		wandering: '[6, 1]',
		returning: '[6, 8]',
		originRelatives: ['Huynh đệ', 'Tử tôn', 'Phụ mẫu', 'Thê tài', 'Quan quỷ', 'Phụ mẫu'],
	},
]

const relativeConverter = ({ originElement, element }: { originElement: ELEMENTS_TYPE; element: ELEMENTS_TYPE }) => {
	let relative = null

	switch (originElement) {
		case 'Water':
			switch (element) {
				case 'Water':
					relative = 'Huynh đệ'
					break
				case 'Fire':
					relative = 'Thê tài'
					break
				case 'Wood':
					relative = 'Tử tôn'
					break
				case 'Mental':
					relative = 'Phụ mẫu'
					break
				case 'Earth':
					relative = 'Quan quỷ'
					break
				default:
					relative = 'Huynh đệ'
					break
			}
			break

		case 'Fire':
			switch (element) {
				case 'Water':
					relative = 'Quan quỷ'
					break
				case 'Fire':
					relative = 'Huynh đệ'
					break
				case 'Wood':
					relative = 'Phụ mẫu'
					break
				case 'Mental':
					relative = 'Thê tài'
					break
				case 'Earth':
					relative = 'Tử tôn'
					break
				default:
					relative = 'Huynh đệ'
					break
			}
			break

		case 'Wood':
			switch (element) {
				case 'Water':
					relative = 'Phụ mẫu'
					break
				case 'Fire':
					relative = 'Tử tôn'
					break
				case 'Wood':
					relative = 'Huynh đệ'
					break
				case 'Mental':
					relative = 'Quan quỷ'
					break
				case 'Earth':
					relative = 'Thê tài'
					break
				default:
					relative = 'Huynh đệ'
					break
			}
			break

		case 'Mental':
			switch (element) {
				case 'Water':
					relative = 'Tử tôn'
					break
				case 'Fire':
					relative = 'Quan quỷ'
					break
				case 'Wood':
					relative = 'Thê tài'
					break
				case 'Mental':
					relative = 'Huynh đệ'
					break
				case 'Earth':
					relative = 'Phụ mẫu'
					break
				default:
					relative = 'Huynh đệ'
					break
			}
			break

		case 'Earth':
			switch (element) {
				case 'Water':
					relative = 'Thê tài'
					break
				case 'Fire':
					relative = 'Phụ mẫu'
					break
				case 'Wood':
					relative = 'Quan quỷ'
					break
				case 'Mental':
					relative = 'Tử tôn'
					break
				case 'Earth':
					relative = 'Huynh đệ'
					break
				default:
					relative = 'Huynh đệ'
					break
			}
			break

		default:
			break
	}

	return relative
}

const findReturningRelative = ({
	allRelative,
	family,
}: {
	allRelative: (string | null)[]
	family: (typeof hexagramFamily)[number] | undefined
}) => {
	let parent = false
	let wife = false
	let child = false
	let brother = false
	let job = false

	let returningMissingRelative = ''
	const indexes: number[] = []

	switch (true) {
		case !allRelative.some((r) => r === 'Phụ mẫu'):
			parent = true
			break
		case !allRelative.some((r) => r === 'Thê tài'):
			wife = true
			break
		case !allRelative.some((r) => r === 'Tử tôn'):
			child = true
			break
		case !allRelative.some((r) => r === 'Huynh đệ'):
			brother = true
			break
		case !allRelative.some((r) => r === 'Quan quỷ'):
			job = true
			break

		default:
			break
	}

	if (parent) {
		family?.originRelatives.map((r, i) => {
			if (r === 'Phụ mẫu') {
				returningMissingRelative = r
				indexes.push(i)
			}
		})
	}
	if (wife) {
		family?.originRelatives.map((r, i) => {
			if (r === 'Thê tài') {
				returningMissingRelative = r
				indexes.push(i)
			}
		})
	}
	if (child) {
		family?.originRelatives.map((r, i) => {
			if (r === 'Tử tôn') {
				returningMissingRelative = r
				indexes.push(i)
			}
		})
	}
	if (brother) {
		family?.originRelatives.map((r, i) => {
			if (r === 'Huynh đệ') {
				returningMissingRelative = r
				indexes.push(i)
			}
		})
	}
	if (job) {
		family?.originRelatives.map((r, i) => {
			if (r === 'Quan quỷ') {
				returningMissingRelative = r
				indexes.push(i)
			}
		})
	}

	return { indexes, returningMissingRelative }
}

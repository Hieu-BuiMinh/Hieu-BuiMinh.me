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
	const family = hexagramFamily.find((f) => f.members.includes(`[${upper}, ${lower}]`))

	// originElement dùng để so sánh ngũ hành 6 hào với ngũ hành quẻ gốc
	// nhằm an đúng lục thân cho quẻ gốc và quẻ biến
	// nếu có `elementToCompareWith` chứng tỏ Hexagrams này là quẻ biến => so sánh 6 hào với ngũ hành của quẻ gốc biến ra nó
	// nếu không có `elementToCompareWith` thì Hexagrams này là quẻ gốc => so sánh 6 hào với ngũ hành của quẻ gốc của chính nó
	const originElement = elementToCompareWith ? elementToCompareWith : (family!.originElement as ELEMENTS_TYPE)

	// tìm lục thân
	const upperRelative = upperBaguaCoverted?.elements.map((element) => {
		return relativeConverter({ originElement, element })
	})
	const lowerRelative = lowerBaguaCoverted?.elements.map((element) => {
		return relativeConverter({ originElement, element })
	})

	return { upperBaguaCoverted, lowerBaguaCoverted, family, relatives: { upper: upperRelative, lower: lowerRelative } }
}

export const transformToBaguasData = ({
	type,
	baguaIndex,
	actives,
}: {
	type: 'UPPER' | 'LOWER'
	baguaIndex: number
	actives?: number[]
}): {
	creatures: string[]
	branch: string
	elements: ELEMENTS_TYPE[]
	value: number[]
	label: string
	index: number
} | null => {
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

	if (actives?.length) {
		const newValue = bagua.value.map((v, index) => (actives.includes(index) ? 1 - v : v))
		bagua.value = newValue // hào động 1=> 0 và 0 => 1
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

const hexagramFamily = [
	{
		family: 'Càn',
		originElement: 'Mental',
		members: ['[1, 1]', '[1, 5]', '[1, 7]', '[1, 8]', '[5, 8]', '[7, 8]', '[3, 8]', '[3, 1]'],
	},
	{
		family: 'Đoài',
		originElement: 'Mental',
		members: ['[2, 2]', '[2, 6]', '[2, 8]', '[2, 7]', '[6, 7]', '[8, 7]', '[4, 7]', '[4, 2]'],
	},
	{
		family: 'Ly',
		originElement: 'Fire',
		members: ['[3, 3]', '[3, 7]', '[3, 5]', '[3, 6]', '[7, 6]', '[5, 6]', '[1, 6]', '[1, 3]'],
	},
	{
		family: 'Chấn',
		originElement: 'Wood',
		members: ['[4, 4]', '[4, 8]', '[4, 6]', '[4, 5]', '[8, 5]', '[6, 5]', '[2, 5]', '[2, 4]'],
	},
	{
		family: 'Tốn',
		originElement: 'Wood',
		members: ['[5, 5]', '[5, 1]', '[5, 3]', '[5, 4]', '[1, 4]', '[3, 4]', '[7, 4]', '[7, 5]'],
	},
	{
		family: 'Khảm',
		originElement: 'Water',
		members: ['[6, 6]', '[6, 2]', '[6, 4]', '[6, 3]', '[2, 3]', '[4, 3]', '[8, 3]', '[8, 6]'],
	},
	{
		family: 'Cấn',
		originElement: 'Earth',
		members: ['[7, 7]', '[7, 3]', '[7, 1]', '[7, 2]', '[3, 2]', '[1, 2]', '[5, 2]', '[5, 7]'],
	},
	{
		family: 'Khôn',
		originElement: 'Earth',
		members: ['[8, 8]', '[8, 4]', '[8, 2]', '[8, 1]', '[4, 1]', '[2, 1]', '[6, 1]', '[6, 8]'],
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

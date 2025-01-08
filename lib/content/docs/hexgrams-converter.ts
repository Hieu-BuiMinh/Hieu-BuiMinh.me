export const converToHexagrams = ({ upper, lower }: { upper: number; lower: number }) => {
	// tìm 8 quái && tên riêng của 8 quái & ngũ hành của 3 hào trong mỗi quái
	const upperBaguaCoverted = transformToBaguasData({
		type: 'UPPER',
		baguaIndex: upper || 1,
	})
	const lowerBaguaCoverted = transformToBaguasData({ type: 'LOWER', baguaIndex: lower || 1 })

	// tìm 8 họ nhà quái
	const family = hexagramFamily.find((f) => f.members.includes(`[${upper}, ${lower}]`))

	const originElement = family!.originElement as ELEMENTS

	// tìm lục thân
	const upperRelative = upperBaguaCoverted?.elements.map((element) => {
		return relativeConverter({ originElement, element })
	})
	const lowerRelative = lowerBaguaCoverted?.elements.map((element) => {
		return relativeConverter({ originElement, element })
	})

	return { upperBaguaCoverted, lowerBaguaCoverted, family, relatives: { upper: upperRelative, lower: lowerRelative } }
}

const transformToBaguasData = ({
	type,
	baguaIndex,
}: {
	type: 'UPPER' | 'LOWER'
	baguaIndex: number
}): {
	creatures: string[]
	branch: string
	elements: ELEMENTS[]
	value: number[]
	label: string
} | null => {
	let bagua = null
	let baguaWithData = null

	switch (baguaIndex) {
		case 0 || 8:
			bagua = { value: [0, 0, 0], label: 'Địa' }
			break
		case 1 || 9:
			bagua = { value: [1, 1, 1], label: 'Thiên' }
			break
		case 2:
			bagua = { value: [0, 1, 1], label: 'Trạch' }
			break
		case 3:
			bagua = { value: [1, 0, 1], label: 'Hỏa' }
			break
		case 4:
			bagua = { value: [0, 0, 1], label: 'Lôi' }
			break
		case 5:
			bagua = { value: [1, 1, 0], label: 'Phong' }
			break
		case 6:
			bagua = { value: [0, 1, 0], label: 'Thủy' }
			break
		case 7:
			bagua = { value: [1, 0, 0], label: 'Sơn' }
			break

		default:
			bagua = { value: [1, 1, 1], label: 'Thiên' }
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
					elements: ['Mental', 'Water', 'Earth'] as ELEMENTS[],
				}
				break
			case 1:
			case 9:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Nhâm',
					elements: ['Earth', 'Mental', 'Fire'] as ELEMENTS[],
				}
				break
			case 2:
				baguaWithData = {
					...bagua,
					creatures: ['Mùi', 'Dậu', 'Hợi'],
					branch: 'Đinh',
					elements: ['Earth', 'Mental', 'Water'] as ELEMENTS[],
				}
				break
			case 3:
				baguaWithData = {
					...bagua,
					creatures: ['Tỵ', 'Mùi', 'Dậu'],
					branch: 'Kỹ',
					elements: ['Fire', 'Earth', 'Mental'] as ELEMENTS[],
				}
				break
			case 4:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Canh',
					elements: ['Earth', 'Mental', 'Fire'] as ELEMENTS[],
				}
				break
			case 5:
				baguaWithData = {
					...bagua,
					creatures: ['Mão', 'Tỵ', 'Mùi'],
					branch: 'Tân',
					elements: ['Wood', 'Fire', 'Earth'] as ELEMENTS[],
				}
				break
			case 6:
				baguaWithData = {
					...bagua,
					creatures: ['Tý', 'Tuất', 'Thân'],
					branch: 'Mậu',
					elements: ['Water', 'Earth', 'Mental'] as ELEMENTS[],
				}
				break
			case 7:
				baguaWithData = {
					...bagua,
					creatures: ['Dần', 'Tý', 'Tuất'],
					branch: 'Bính',
					elements: ['Wood', 'Water', 'Earth'] as ELEMENTS[],
				}
				break

			default:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Nhâm',
					elements: ['Earth', 'Mental', 'Fire'] as ELEMENTS[],
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
					elements: ['Wood', 'Fire', 'Earth'] as ELEMENTS[],
				}
				break
			case 1:
			case 9:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Giáp',
					elements: ['Earth', 'Wood', 'Water'] as ELEMENTS[],
				}
				break
			case 2:
				baguaWithData = {
					...bagua,
					creatures: ['Sửu', 'Mão', 'Tỵ'],
					branch: 'Đinh',
					elements: ['Earth', 'Wood', 'Fire'] as ELEMENTS[],
				}
				break
			case 3:
				baguaWithData = {
					...bagua,
					creatures: ['Hợi', 'Sửu', 'Mão'],
					branch: 'Kỹ',
					elements: ['Water', 'Earth', 'Wood'] as ELEMENTS[],
				}
				break
			case 4:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Canh',
					elements: ['Earth', 'Wood', 'Water'] as ELEMENTS[],
				}
				break
			case 5:
				baguaWithData = {
					...bagua,
					creatures: ['Dậu', 'Hợi', 'Sửu'],
					branch: 'Tân',
					elements: ['Mental', 'Water', 'Earth'] as ELEMENTS[],
				}
				break
			case 6:
				baguaWithData = {
					...bagua,
					creatures: ['Ngọ', 'Thìn', 'Dần'],
					branch: 'Mậu',
					elements: ['Fire', 'Earth', 'Wood'] as ELEMENTS[],
				}
				break
			case 7:
				baguaWithData = {
					...bagua,
					creatures: ['Thân', 'Ngọ', 'Thìn'],
					branch: 'Bính',
					elements: ['Mental', 'Fire', 'Earth'] as ELEMENTS[],
				}
				break

			default:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Nhâm',
					elements: ['Earth', 'Wood', 'Water'] as ELEMENTS[],
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

type ELEMENTS = 'Water' | 'Fire' | 'Wood' | 'Mental' | 'Earth'

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

const relativeConverter = ({ originElement, element }: { originElement: ELEMENTS; element: ELEMENTS }) => {
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

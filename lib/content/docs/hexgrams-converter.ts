export const converToHexagrams = ({ type, baguaIndex }: { type: 'UPPER' | 'LOWER'; baguaIndex: number }) => {
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
					elements: ['kim', 'thủy', 'thổ'],
				}
				break
			case 1:
			case 9:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Nhâm',
					elements: ['thổ', 'kim', 'hỏa'],
				}
				break
			case 2:
				baguaWithData = {
					...bagua,
					creatures: ['Mùi', 'Dậu', 'Hợi'],
					branch: 'Đinh',
					elements: ['thổ', 'kim', 'thủy'],
				}
				break
			case 3:
				baguaWithData = {
					...bagua,
					creatures: ['Tỵ', 'Mùi', 'Dậu'],
					branch: 'Kỹ',
					elements: ['hỏa', 'thổ', 'kim'],
				}
				break
			case 4:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Canh',
					elements: ['thổ', 'kim', 'hỏa'],
				}
				break
			case 5:
				baguaWithData = {
					...bagua,
					creatures: ['Mão', 'Tỵ', 'Mùi'],
					branch: 'Tân',
					elements: ['mộc', 'hỏa', 'thổ'],
				}
				break
			case 6:
				baguaWithData = {
					...bagua,
					creatures: ['Tý', 'Tuất', 'Thân'],
					branch: 'Mậu',
					elements: ['thủy', 'thổ', 'kim'],
				}
				break
			case 7:
				baguaWithData = {
					...bagua,
					creatures: ['Dần', 'Tý', 'Tuất'],
					branch: 'Bính',
					elements: ['mộc', 'thủy', 'thổ'],
				}
				break

			default:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Nhâm',
					elements: ['thổ', 'kim', 'hỏa'],
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
					elements: ['mộc', 'hỏa', 'thổ'],
				}
				break
			case 1:
			case 9:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Giáp',
					elements: ['thổ', 'mộc', 'thủy'],
				}
				break
			case 2:
				baguaWithData = {
					...bagua,
					creatures: ['Sửu', 'Mão', 'Tỵ'],
					branch: 'Đinh',
					elements: ['thổ', 'mộc', 'hỏa'],
				}
				break
			case 3:
				baguaWithData = {
					...bagua,
					creatures: ['Hợi', 'Sửu', 'Mão'],
					branch: 'Kỹ',
					elements: ['thủy', 'thổ', 'mộc'],
				}
				break
			case 4:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Canh',
					elements: ['thổ', 'mộc', 'thủy'],
				}
				break
			case 5:
				baguaWithData = {
					...bagua,
					creatures: ['Dậu', 'Hợi', 'Sửu'],
					branch: 'Tân',
					elements: ['kim', 'thủy', 'thổ'],
				}
				break
			case 6:
				baguaWithData = {
					...bagua,
					creatures: ['Ngọ', 'Thìn', 'Dần'],
					branch: 'Mậu',
					elements: ['hỏa', 'thổ', 'mộc'],
				}
				break
			case 7:
				baguaWithData = {
					...bagua,
					creatures: ['Thân', 'Ngọ', 'Thìn'],
					branch: 'Bính',
					elements: ['kim', 'hỏa', 'thổ'],
				}
				break

			default:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Nhâm',
					elements: ['thổ', 'mộc', 'thủy'],
				}
				break
		}
	}

	return baguaWithData
}

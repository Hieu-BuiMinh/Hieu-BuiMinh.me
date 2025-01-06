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
					elements: ['Metal', 'Water', 'Earth'],
				}
				break
			case 1:
			case 9:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Nhâm',
					elements: ['Earth', 'Metal', 'Fire'],
				}
				break
			case 2:
				baguaWithData = {
					...bagua,
					creatures: ['Mùi', 'Dậu', 'Hợi'],
					branch: 'Đinh',
					elements: ['Earth', 'Metal', 'Water'],
				}
				break
			case 3:
				baguaWithData = {
					...bagua,
					creatures: ['Tỵ', 'Mùi', 'Dậu'],
					branch: 'Kỹ',
					elements: ['Fire', 'Earth', 'Metal'],
				}
				break
			case 4:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Canh',
					elements: ['Earth', 'Metal', 'Fire'],
				}
				break
			case 5:
				baguaWithData = {
					...bagua,
					creatures: ['Mão', 'Tỵ', 'Mùi'],
					branch: 'Tân',
					elements: ['Wood', 'Fire', 'Earth'],
				}
				break
			case 6:
				baguaWithData = {
					...bagua,
					creatures: ['Tý', 'Tuất', 'Thân'],
					branch: 'Mậu',
					elements: ['Water', 'Earth', 'Metal'],
				}
				break
			case 7:
				baguaWithData = {
					...bagua,
					creatures: ['Dần', 'Tý', 'Tuất'],
					branch: 'Bính',
					elements: ['Wood', 'Water', 'Earth'],
				}
				break

			default:
				baguaWithData = {
					...bagua,
					creatures: ['Tuất', 'Thân', 'Ngọ'],
					branch: 'Nhâm',
					elements: ['Earth', 'Metal', 'Fire'],
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
					elements: ['Wood', 'Fire', 'Earth'],
				}
				break
			case 1:
			case 9:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Giáp',
					elements: ['Earth', 'Wood', 'Water'],
				}
				break
			case 2:
				baguaWithData = {
					...bagua,
					creatures: ['Sửu', 'Mão', 'Tỵ'],
					branch: 'Đinh',
					elements: ['Earth', 'Wood', 'Fire'],
				}
				break
			case 3:
				baguaWithData = {
					...bagua,
					creatures: ['Hợi', 'Sửu', 'Mão'],
					branch: 'Kỹ',
					elements: ['Water', 'Earth', 'Wood'],
				}
				break
			case 4:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Canh',
					elements: ['Earth', 'Wood', 'Water'],
				}
				break
			case 5:
				baguaWithData = {
					...bagua,
					creatures: ['Dậu', 'Hợi', 'Sửu'],
					branch: 'Tân',
					elements: ['Metal', 'Water', 'Earth'],
				}
				break
			case 6:
				baguaWithData = {
					...bagua,
					creatures: ['Ngọ', 'Thìn', 'Dần'],
					branch: 'Mậu',
					elements: ['Fire', 'Earth', 'Wood'],
				}
				break
			case 7:
				baguaWithData = {
					...bagua,
					creatures: ['Thân', 'Ngọ', 'Thìn'],
					branch: 'Bính',
					elements: ['Metal', 'Fire', 'Earth'],
				}
				break

			default:
				baguaWithData = {
					...bagua,
					creatures: ['Thìn', 'Dần', 'Tý'],
					branch: 'Nhâm',
					elements: ['Earth', 'Wood', 'Water'],
				}
				break
		}
	}

	return baguaWithData
}

/*
Cách nhớ 64 quẻ kinh dịch theo bộ
CÁCH NHỚ 64 QUẺ THEO HỌ
1. 8 quẻ thuộc họ Càn: Bát thuần Càn; Thiên Phong Cấu, Thiên Sơn Độn, Thiên Địa Bĩ, Phong Địa Quan, Sơn Dịa Bác, Hỏa Địa Tấn, Hỏa Thiên Đại Hữu.
Tám quẻ kép thuộc họ Bát thuần Càn có thể nhớ ý nghĩa chính của từng quẻ (lấy tên cuối của quẻ) theo thứ tự biến đổi của nó theo bài thơ Đường có 4 câu như sau:

Càn cứng, Cấu giao, Độn ẩn xa
Bĩ tắc, Quan xem, Bác bóc ra
Tấn tiến Du Hồn, Ngừng Đại Hữu
Càn Kim ghi nhớ 4 câu ca

4 câu thơ trên nói tóm tắt ý nghĩa chính của quẻ Càn là cứng : cứ mạnh dạn chuẩn bị hành động sao cho phù hợp sự phát triển tăng dần; Cấu là giao tiếp được nhưng không nên kéo dài quá; Độn là phải ẩn xa, tránh lao vào tham gia ngay, phải chờ thời; Bĩ là tắc không giải quyết được không lao vào vô ích; Quan là có thể xem xét nghiên cứu xem thực hiện ra sao, thế nào?; Bác là có thể bóc tách ra để xem xét thực hiện thế nào?; Tấn là có thể tiến lên mà xem thực hiện, nó là quẻ Du Hồn ý nói loanh quanh chưa thực hiện được ngay đâu, phải chịu chờ đợi không vội vàng; quẻ Đại Hữu có ý báo hiệu đã nhiều rồi, nên Ngừng lại; Càn Kim và cả 8 quẻ thuộc họ Càn này đều mang hành Kim và nhớ 4 câu ca này là thuộc 8 quẻ họ càn cùng ý nghĩa chính của nó khuyên ta hành động khi gặp từng quẻ này để hành động tinh khôn hơn, hợp quy luật trời đất thời điểm lập quẻ dịch để xem xét..
2. 8 quẻ thuộc họ Đoài:Bát thuần Đoài , Trạch Thủy Khốn; Trạch Địa Tụy, Trạch Sơn Hàm , Thủy Sơn Kiển, Địa Sơn Khiêm, Lôi Sơn Tiểu Quá, Lôi Trạch Quy Muội. Tương tự như trên có bài thơ Đường:

Đoài vui, Khốn khó, Tụy tụ ngưng
Hàm giao, Kiển hạn, Khiêm phải nhường
Tiểu Quá lỗi nhỏ, Theo Quy Muội
Đoài kim, luôn nhớ gái út thương

Quẻ bát thuần Đoài có nghĩa là vui, quẻ Trạch Thủy Khốn có nghĩa là gặp khó khăn phải chờ, kiên trì; Quẻ Trạch Địa Tụy có nghĩa lạ tụ lại ngưng lai; Quẻ Trạch Sơn Hàm có nghĩa là giao tiếp được; Quẻ Thủy Sơn Kiển có nghĩa là gặp hạn; quẻ Địa Sơn Khiêm là phải biết nhường nhịn; Quẻ Lôi Sơn Tiểu Quá là phạm lỗi nhỏ; Quẻ Lôi Trạch Quy Muội là thuận theo thôi; Quẻ họ Đoài này đều mang hành Kim và Đoài trong gia đình chỉ người con gái út.
3. 8 quẻ thuộc họ Ly vi hỏa: Bát thuần Ly; Hỏa Sơn Lữ; Hỏa Phong Đỉnh; Hỏa Thủy Vị Tế; Sơn Thủy Mông; Phong Thủy Hoán; Thiên Thủy Tụng; Thiên Hỏa Đồng Nhân: Có bài thơ như sau
Hỏa Ly tráng lệ Lữ khách xa
Đỉnh vững; Vị Tế kết thúc ra
Mông muội, Hoán đổi, Tụng Tranh Luận
Đồng Nhân thân thiết như Đại Gia.
Quẻ Bát thuần Ly thuộc hành hỏa, có nghĩa là đẹp, tráng lệ; Quẻ Hỏa Sơn Lữ có nghĩa là khách phương xa đến; Quẻ Hỏa Phong Đỉnh có nghĩa là vững vàng, vững chắc; quẻ Hỏa Thủy Vị Tế là kết thúc giai đoạn ra giai đoạn khác , Quẻ Sơn Thủy Mông có nghĩa là mông muội thô sơ; Quẻ Phong Thủy Hoán có nghĩa là thay đổi; Quẻ Thiên Thủy Tụng có nghĩa là phải tranh luận, bàn bạc kỹ; Quẻ Thiên Hỏa Đồng Nhân có ý nghĩa là thân thiết như trong một đại gia đình
4. 8 quẻ họ Chấn: Bát thuần Chấn (Lôi), Lôi Dịa Dự, Lôi Thủy Giải, Lôi Phong Hằng,Địa Phong Thăng, Thủy Phong Tĩnh, Trạch Phong Đại Quá, Trạch Lôi Tùy, Có bài thơ như sau:
Chấn Lôi động phát, Dự thêm vui
Giải quyết, lâu dài Hằng chẳng lui
Thăng tiến, Tĩnh yên, lo Đại Quá
Tùy theo, Chấn Mộc quyết chẳng lùi
Quẻ bát thuần Lôi có nghĩa là động phát; quẻ Lôi Địa Dự có nghĩa là vui vẻ, Quẻ Lôi Thủy Giải có nghĩa là giải quyết được, Quẻ Lôi Phong Hằng có nghĩa là bền vững lâu dài không phải lui bước, Quẻ Địa Phong Thăng có nghĩa là cứ tiến lên, Quẻ  Thủy Phong Tĩnh có nghĩa là yên ổn, Quẻ Trạch Phong Đại Quá  có nghĩa là phải lo đại quá rôi, nên ngừng lại, Quẻ Trạch Lôi  Tùy có nghĩa là cứ theo tiếp, Toàn bộ 8 quẻ họ Chấn này đều thuộc hành Mộc
5. 8 quẻ thuộc họ Tốn ( Phong): Bát thuấn Tốn ( Phong); Phong Thiên Tiểu súc; Phong Hỏa Gia Nhân; Phong Lôi Ích; Thiên Lôi Vô Vọng; Hỏa Lôi Phệ Hạp;Sơn Lôi Di; Sơn Phong Cổ. Có bài thơ để nhớ như sau:
   Tốn phong Hòa Thuận, Tiểu Súc sao?
Gia Nhân đồng thuận, Ích hại hao.
Vô Vọng Thiên tai, Phệ Hạp sé
Di dưỡng, Cổ vật mới Mộc cao.
Có nghĩa là quẻ Bát thuần Tốn, bát thuần phong là Hòa Thuận; quẻ Phong Thiên Tiểu súc là phải xem vì sao đây; Quẻ Phong Hỏa Gia Nhân là Đồng Thuận; quẻ Phong Lôi Ích có nghĩa lại hại, hao hụt; quẻ Thiên Lôi Vô Vọng là bị Thiên tai; quẻ Hỏa Lôi Phệ Hạp là bị cắt sé ra; Quẻ Sơn Lôi Di là nuôi dưỡng; quẻ Sơn Phong Cổ  là cổ vật mới tìm; Tám quẻ này hành Mộc
6. 8 quẻ thuộc họ Khảm ( Thủy): Bát thuần Khảm (Thủy); Thủy Trạch Tiết; Thủy Lôi Truân ; Thủy Hỏa Ký Tế; Trạch Hỏa Cách; 
Lôi Hỏa Phong ; Địa Hỏa Minh Di; Địa Thủy Sư. Có bài thơ sau:
Khảm Thủy thâm sâu,  Tiết tụ ngưng
Gian Truân, Ký Tế hợp hết săn;
Cải Cách; Mạnh Phong, Minh Di lóe
Sư đoàn quần chúng, nhớ lời răn.
Có nghĩa là: Quẻ bát thuần Khảm có ý nghĩa thâm sâu; Quẻ Trạch Thủy Tiết có nghĩa là tụ ngưng lại; Quẻ Thủy Lôi Truân có nghĩa là gian truân vất vả; Quẻ Thủy Hỏa Ký Tế có nghĩa là hợp lại hết giai đoạn đó; Quẻ Trạch Hỏa Cách có ý nghĩa là phải cải cách; Quẻ Lôi Hỏa Phong là Mạnh mẽ lên; Quẻ Địa Hỏa Minh Di là lóe sáng lên; Quẻ Địa Thủy Sư là sức mạnh đội quân, quần chúng đông đảo;
7.8 quẻ thuộc họ Cấn (Sơn) Bát thuần Cấn (Sơn); Sơn Hỏa Bí; Sơn Thiên Đại Súc; Sơn Trạch Tổn; Hỏa Trạch Khuê; Thiên trạch Lý; Phong Trạch Trung Phù; Phong Sơn Tiệm. Có bài thơ rằng:
Cấn Sơn ngừng thổ Bí đẹp ngoài.
Đại Súc Tụ Hồi, Tổn hại sai,
Khuê bối họa hung Lý lẽ cứng,
Trung phù thành tín, Tiệm tiến mai.
Có nghĩa là: Quẻ bát thuần Cấn hành Thổ là ngừng lại; Quẻ Sơn Hỏa Bí là đẹp bề ngoài; Quẻ Sơn Thiên Đại Sức là tụ hồi lại; Quẻ Sơn Trạch Tổn là có hại, sai; Quẻ Hỏa Trạch Khuê là gặp họa bối rối, gặp hung; Quẻ Thiên trạch Lý là có lý lẽ cứng; Quẻ Phong Trạch Trung Phù là thành tín; Quẻ Phong Sơn Tiệm là cứ tiến về tương lai gần.
8.8 Quẻ họ Khôn Địa gồm: Bát thuần Khôn (Địa); Địa Lôi Phục; Địa Trạch Lâm; Địa Thiên Thái; Lôi Thiên Đại Tráng; Trạch Thiên Quải; Thủy Thiên Nhu; Thủy Địa Tỷ; Có bài thơ rằng:
Khôn Địa Thuận mềm; Phục trở về
Lâm lớn hưng thịnh, Thái mọi bề,
Đại Tráng chí lớn, Quải quả quyết,
Nhu cầu Tỷ thổ thuận quay về.
Có nghĩa là: Quẻ bát Thuần khôn hay Địa là thuận, mềm mà theo; Phục là quay trở về; Lâm là lớn lên hưng thịnh; Thái là yên ổn mọi bề; Đại tráng là chí lớn gặp nhau; Quải là quả quyết được Nhu là nhu cầu Tỷ là thuận quay về. Tất cả 8 quẻ này đều hành Thổ.
*/

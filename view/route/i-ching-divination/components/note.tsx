import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

function Note() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">Lưu ý</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>⚠️ Một số lưu ý trước khi gieo quẻ</DialogTitle>
					<DialogDescription>
						<div className="flex flex-col gap-2 pr-4 pt-2">
							<div>
								1. Hạn chế xem đi xem lại nhiều lần cho một vấn đề, gây loạn quẻ, thông tin không còn
								chính xác nữa
							</div>
							<div>
								2. Hạn chế gieo quẻ lúc giao thời, ví dụ từ 23h-1h sáng giao giữa ngày này và ngày kia,
								năm cũ và năm mới,.v.v.
							</div>
							<div>
								3. Nên thành tâm khấn nguyện để tập trung vào việc đặt câu hỏi thay vì hỏi lan man. Có
								thể xem văn mẫu dưới đây:
							</div>
						</div>

						<div className="mt-6 rounded border border-dashed p-2 italic text-foreground">
							&quot;Tứ khấu Linh Quy, Phục Hy, Văn Vương, Châu Công, Khổng Tử, Thất Thập Nhị Hiền, Bát Bộ
							Thần Tiên đồng lai chứng giám. Môn hạ -tên họ ...-, nay về việc ... không tỏ tường lòng còn
							nghi vấn, kính xin thần linh cho biết cát hung được mất, một quẻ là đúng không dám nghi
							ngờ.&quot;
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default Note

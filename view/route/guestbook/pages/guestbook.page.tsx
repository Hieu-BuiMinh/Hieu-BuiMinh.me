import PageTitle from '@/view/components/blog-content/page-title'
import Comments from '@/view/route/guestbook/components/comments'
import Pinned from '@/view/route/guestbook/components/pinned'
import PostComment from '@/view/route/guestbook/components/post-comment'

const title = 'Guestbook'
const description = 'Sign my guestbook and share your idea. You can tell me anything here!'

function GuestbookPageView() {
	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />

			<Pinned />

			<PostComment />

			<Comments />
		</div>
	)
}

export default GuestbookPageView

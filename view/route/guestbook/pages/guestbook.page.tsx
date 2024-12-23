import PageTitle from '@/view/components/blog-content/page-title'
import GuestbookComments from '@/view/route/guestbook/components/guestbook-comments'
import Pinned from '@/view/route/guestbook/components/pinned'
import GuestbookPostCommentForm from '@/view/route/guestbook/components/post-comment-form'

const title = 'Guestbook'
const description = 'Sign my guestbook and share your idea. You can tell me anything here!'

function GuestbookPageView() {
	return (
		<div className="container flex max-w-4xl flex-col gap-3">
			<PageTitle title={title} description={description} />

			<Pinned />

			<GuestbookPostCommentForm />

			<GuestbookComments />
		</div>
	)
}

export default GuestbookPageView

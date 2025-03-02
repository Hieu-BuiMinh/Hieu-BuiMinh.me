import '../style.css'

// import { notFound } from 'next/navigation'
// import { pages } from '@/.velite'
import BlockQuote from '@/components/commons/mdx/custom-components/block-quote'
import PageTitle from '@/view/components/blog-content/page-title'
import { allQuotes } from '@/view/route/quotes/data/quotes-data'

const title = 'Quotes'
const description = `Welcome to the Quotes. Where I share some of the saying that have inspired me along the way. I hope these words can offer a bit of reflection, encouragement, and positivity, just as they've done for me.`

export default async function QuotesPageview() {
	// const post = pages.find((post) => post.slugAsParams === 'quotes')

	// if (!post || !post.published) {
	// 	notFound()
	// }

	return (
		<div className="container m-auto flex max-w-screen-lg flex-col gap-3">
			<PageTitle title={title} description={description} />

			<article className="container prose mx-auto max-w-full pb-6 dark:prose-invert">
				{/* <MDXContent code={post.body} /> */}
				<div className="not-prose quotes-masonry mt-3">
					{allQuotes.map((quote) => {
						return <BlockQuote key={quote.quote} data={quote} className="quotes-masonry-item" />
					})}
				</div>
				{/* {post.lastUpdated && <PostLastUpdated date={post.lastUpdated} />} */}
			</article>
		</div>
	)
}

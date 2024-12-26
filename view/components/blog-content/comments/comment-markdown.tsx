import MarkdownToJSX from 'markdown-to-jsx'
import { Roboto } from 'next/font/google'
import { memo } from 'react'

import { cn } from '@/lib/utils'

type MarkdownProps = {
	children: string
}

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
})

const Markdown = memo((props: MarkdownProps) => {
	const { children } = props

	return (
		<div
			className={cn('ml-[14px] border-l border-dashed py-3 pl-[26px] text-sm text-foreground', roboto.className)}
		>
			<MarkdownToJSX
				options={{
					overrides: {
						p: ({ children, ...props }) => (
							<p {...props} className="my-2">
								{children}
							</p>
						),
						// pre: CommentCodeBlock,
						// table: CommentTable,
						// thead: TableHeader,
						// tr: TableRow,
						// th: TableHead,
						// td: TableCell,
					},
					wrapper: 'article',
					disableParsingRawHTML: true,
				}}
			>
				{children}
			</MarkdownToJSX>
		</div>
	)
})

Markdown.displayName = 'Markdown'

export default Markdown

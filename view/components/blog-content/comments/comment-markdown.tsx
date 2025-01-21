import MarkdownToJSX from 'markdown-to-jsx'
import { memo } from 'react'

type MarkdownProps = {
	children: string
}

const Markdown = memo((props: MarkdownProps) => {
	const { children } = props

	return (
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
	)
})

Markdown.displayName = 'Markdown'

export default Markdown

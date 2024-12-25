import MarkdownToJSX from 'markdown-to-jsx'
import { memo } from 'react'

type MarkdownProps = {
	children: string
}

const Markdown = memo((props: MarkdownProps) => {
	const { children } = props

	return (
		<div className="prose my-3 text-foreground">
			<MarkdownToJSX
				options={{
					// overrides: {
					// 	a: Link,
					// 	pre: CommentCodeBlock,
					// 	table: CommentTable,
					// 	thead: TableHeader,
					// 	tr: TableRow,
					// 	th: TableHead,
					// 	td: TableCell,
					// },
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

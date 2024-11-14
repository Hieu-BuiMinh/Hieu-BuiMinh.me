'use client'

import { ScrollArea } from '@radix-ui/react-scroll-area'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { forwardRef, useEffect, useRef, useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { ScrollBar } from '@/components/ui/scroll-area'
import { getIconByFilename } from '@/lib/get-icon-by-filename'
import { cn } from '@/lib/utils'

type CodeBlockProps = {
	'data-language'?: string
	figureClassName?: string
} & React.ComponentPropsWithoutRef<'pre'>

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>((props, ref) => {
	const { children, className, title, 'data-language': lang, figureClassName, ...rest } = props
	console.log(props)

	const textInput = useRef<HTMLPreElement>(null)
	const Icon = getIconByFilename(lang ?? '')

	const onCopy = () => {
		void navigator.clipboard.writeText(textInput.current?.textContent ?? '')
	}

	return (
		<figure
			className={cn(
				'not-prose group relative my-1 overflow-hidden rounded-lg border bg-secondary/50 text-sm',
				figureClassName
			)}
		>
			{title ? (
				<div className="flex flex-row items-center gap-2 border-b bg-muted/50 px-4 py-1.5">
					<div className="text-muted-foreground">
						<Icon className="size-3.5" />
					</div>
					<figcaption className="flex-1 truncate text-muted-foreground">{title}</figcaption>
					<CopyButton onCopy={onCopy} />
				</div>
			) : (
				<CopyButton className="absolute right-4 top-3 z-10" onCopy={onCopy} />
			)}

			<ScrollArea>
				<pre className={cn('p-4', className)} {...rest}>
					{children}
				</pre>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</figure>
	)
})

type CopyButtonProps = {
	onCopy: () => void
} & ButtonProps

const CopyButton = (props: CopyButtonProps) => {
	const { onCopy, className, ...rest } = props
	const [isCopied, setIsCopied] = useState(false)

	useEffect(() => {
		const copyResetTimeoutId = setTimeout(() => {
			setIsCopied(false)
		}, 2000)

		return () => {
			clearTimeout(copyResetTimeoutId)
		}
	}, [isCopied])

	return (
		<Button
			className={cn('size-8 p-0 opacity-0 transition-opacity group-hover:opacity-100', className)}
			variant="outline"
			onClick={() => {
				onCopy()
				setIsCopied(true)
			}}
			type="button"
			aria-label="Copy code to clipboard"
			{...rest}
		>
			{isCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
		</Button>
	)
}

CodeBlock.displayName = 'CodeBlock'

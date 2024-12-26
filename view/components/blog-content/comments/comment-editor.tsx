'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { BoldIcon, Info, ItalicIcon, SendIcon, StrikethroughIcon } from 'lucide-react'
import { useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import RHFTextArea from '@/components/commons/form-input/RHF-text-area'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useStoreUserEffect } from '@/hooks/useStoreUserEffect'
import { cn } from '@/lib/utils'
import UnauthorizedOverlay from '@/view/components/blog-content/unauthorized-overlay'

const postCommentFormSchema = z.object({
	message: z.string().min(1, {
		message: 'Message cannot be empty',
	}),
})

export type TPostCommentFromSchemaType = typeof postCommentFormSchema

type Command = {
	onModEnter?: () => void
	onEscape?: () => void
}

const setRangeText = (
	textarea: HTMLTextAreaElement,
	replacement: string,
	start: number,
	end: number,
	selectionMode?: SelectionMode
) => {
	textarea.setRangeText(replacement, start, end, selectionMode)
	// Trigger input event to update the value
	textarea.dispatchEvent(new Event('input', { bubbles: true }))
}

const decorateText = (textarea: HTMLTextAreaElement | null, type: 'bold' | 'italic' | 'strikethrough') => {
	if (!textarea) return
	const { selectionStart, selectionEnd, value } = textarea
	const selectedText = value.slice(selectionStart, selectionEnd)

	const decoration = {
		bold: `**${selectedText}**`,
		strikethrough: `~~${selectedText}~~`,
		italic: `*${selectedText}*`,
	}

	const newSelectionStart = {
		bold: selectionStart + 2,
		strikethrough: selectionStart + 2,
		italic: selectionStart + 1,
	}

	setRangeText(textarea, decoration[type], selectionStart, selectionEnd, 'end')

	if (!selectedText) {
		textarea.setSelectionRange(newSelectionStart[type], newSelectionStart[type])
	}

	textarea.focus()
}

const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>, command: Command) => {
	const { onModEnter, onEscape } = command
	const textarea = event.target as HTMLTextAreaElement
	const { selectionStart, selectionEnd, value } = textarea

	if (event.key === 'Tab') {
		event.preventDefault()
		const tabSpace = '		'

		setRangeText(textarea, tabSpace, selectionStart, selectionEnd, 'end')
		textarea.setSelectionRange(selectionStart + tabSpace.length, selectionStart + tabSpace.length)
	}

	if (event.key === 'Escape') {
		event.preventDefault()
		onEscape?.()

		return
	}

	if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
		event.preventDefault()
		onModEnter?.()

		return
	}

	if (event.key === 'Enter') {
		const currentLine = value.slice(0, Math.max(0, selectionStart)).split('\n').pop()

		const unorderedListNoContent = currentLine?.match(/^(\s*)([*-])\s$/)
		const orderedListNoContent = currentLine?.match(/^(\d+)\.\s$/)

		if (!!unorderedListNoContent || !!orderedListNoContent) {
			event.preventDefault()

			const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
			const lineEnd = selectionStart
			setRangeText(textarea, '', lineStart, lineEnd, 'start')

			return
		}

		const orderedList = currentLine?.match(/^(\d+)\.\s/)

		if (orderedList?.[1]) {
			const number = Number.parseInt(orderedList[1], 10) + 1
			const insertText = `\n${number}. `

			event.preventDefault()
			setRangeText(textarea, insertText, selectionStart, selectionEnd, 'end')
		}

		const unorderedList = currentLine?.match(/^(\s*)([*-])\s/)

		if (unorderedList) {
			const insertText = `\n${unorderedList[1]}${unorderedList[2]} `

			event.preventDefault()
			setRangeText(textarea, insertText, selectionStart, selectionEnd, 'end')
		}
	}
}

function CommentEditor({
	onSubmitcallback,
	isAuthenticated = false,
}: {
	onSubmitcallback: (data: z.infer<TPostCommentFromSchemaType>) => void
	isAuthenticated?: boolean
}) {
	// const { isAuthenticated } = useStoreUserEffect()

	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const methods = useForm<z.infer<TPostCommentFromSchemaType>>({
		resolver: zodResolver(postCommentFormSchema),
		defaultValues: {
			message: '',
		},
	})

	const onModEnter = () => {
		methods.handleSubmit(onSubmit)()
	}

	const onSubmit = async (data: z.infer<TPostCommentFromSchemaType>) => {
		const maliciousPattern = /<script[\s\S]*?>[\s\S]*?<\/script[\s\S]*?>|javascript:/gi
		if (maliciousPattern.test(data.message)) {
			toast.error('Your comment contains unsafe content!')
			return
		}

		onSubmitcallback(data)
		setTimeout(() => {
			methods.reset({ message: '' })
		}, 500)
	}

	return (
		<div
			className={cn(
				'relative rounded-lg border bg-background pb-1 ring-offset-background focus-within:ring-ring',
				'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2',
				'aria-disabled:cursor-not-allowed aria-disabled:opacity-80'
			)}
		>
			{!isAuthenticated ? <UnauthorizedOverlay /> : null}
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild className="absolute right-2 top-2">
						<Info className="text-blue-700" size={15} />
					</TooltipTrigger>
					<TooltipContent>
						<p className="w-32">
							For the comment containing MDX content, you need to press Enter 2 times to go down the line
							and don&apos;t put &#60;script / &#62; tags into it 🪬
						</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
					<RHFTextArea
						onKeyDown={(e) => {
							handleKeyDown(e, { onModEnter, onEscape: () => {} })
						}}
						ref={textareaRef}
						name="message"
						className="min-h-10 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
					/>

					<div className="flex flex-row items-center gap-0.5 px-1.5">
						<Button
							type="button"
							aria-label="Toggle bold"
							variant="ghost"
							size="icon"
							className="size-7"
							onClick={() => {
								decorateText(textareaRef.current, 'bold')
							}}
						>
							<BoldIcon className="size-4" />
						</Button>
						<Button
							type="button"
							aria-label="Toggle strikethrough"
							variant="ghost"
							size="icon"
							className="size-7"
							onClick={() => {
								decorateText(textareaRef.current, 'strikethrough')
							}}
						>
							<StrikethroughIcon className="size-4" />
						</Button>
						<Button
							type="button"
							aria-label="Toggle italic"
							variant="ghost"
							size="icon"
							className="size-7"
							onClick={() => {
								decorateText(textareaRef.current, 'italic')
							}}
						>
							<ItalicIcon className="size-4" />
						</Button>
					</div>

					<Button
						variant="ghost"
						size="icon"
						className="absolute bottom-1.5 right-2 size-7"
						type="submit"
						aria-label="Send comment"
						disabled={!isAuthenticated || !methods.formState.errors}
					>
						<SendIcon className="size-4" />
					</Button>
				</form>
			</FormProvider>
		</div>
	)
}

export default CommentEditor

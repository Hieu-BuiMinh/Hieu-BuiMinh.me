'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { BoldIcon, ItalicIcon, SendIcon, StrikethroughIcon } from 'lucide-react'
import { useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { DevBlogPost, DocPost, InterestPost } from '@/.velite'
import RHFTextArea from '@/components/commons/form-input/RHF-text-area'
import { Button } from '@/components/ui/button'
import { useStoreUserEffect } from '@/hooks/useStoreUserEffect'
import { cn } from '@/lib/utils'

const guestbookFormSchema = z.object({
	message: z.string().min(1, {
		message: 'Message cannot be empty',
	}),
})

type TGuestbookFromSchemaType = typeof guestbookFormSchema

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
		const tabSpace = '  '

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

function PostCommentForm({ post }: { post: DevBlogPost | DocPost | InterestPost }) {
	const { isAuthenticated } = useStoreUserEffect()
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const methods = useForm<z.infer<TGuestbookFromSchemaType>>({
		resolver: zodResolver(guestbookFormSchema),
		defaultValues: {
			message: '',
		},
	})

	const onSubmit = (data: z.infer<TGuestbookFromSchemaType>) => {
		console.log(data)
	}

	const adjustHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}

	return (
		<div
			className={cn(
				'relative rounded-lg border bg-background pb-1 ring-offset-background focus-within:ring-ring',
				'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2',
				'aria-disabled:cursor-not-allowed aria-disabled:opacity-80'
			)}
		>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
					<RHFTextArea
						// onKeyDown={(e) => {
						// 	handleKeyDown(e, { onModEnter, onEscape })
						// }}
						onInput={adjustHeight}
						ref={textareaRef}
						name="message"
						className="min-h-10 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
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

export default PostCommentForm

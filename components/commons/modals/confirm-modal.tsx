'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import useConfirmModal from '@/hooks/use-confirm-modal'

function ConfirmModal() {
	const { actions, isOpen, title, description, buttons, close, content } = useConfirmModal()

	const onConfirm = () => {
		actions?.onConfirm?.()
		close()
	}
	const onCancel = () => {
		actions?.onCancel?.()
		close()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onCancel}>
			<DialogContent>
				<DialogHeader>
					{title && <DialogTitle>{title}</DialogTitle>}

					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>

				{content}

				{buttons && (
					<DialogFooter>
						{buttons.confirm && (
							<Button onClick={onConfirm} variant="default">
								{buttons.confirm}
							</Button>
						)}
						{buttons.cancel && (
							<Button onClick={onCancel} variant="destructive">
								{buttons.cancel}
							</Button>
						)}
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default ConfirmModal

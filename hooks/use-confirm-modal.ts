import { create } from 'zustand'

interface ConfirmModalState {
	bears: number
	isOpen: boolean
	title?: string
	content?: string | React.ReactNode
	description?: string | React.ReactNode
	buttons?: { cancel?: string; confirm?: string }
	actions?: { onConfirm?: () => void; onCancel?: () => void }
}

interface ConfirmModalMethod {
	open: () => void
	close: () => void
	setModalOptions: ({
		content,
		title,
		buttons,
	}: {
		title?: ConfirmModalState['title']
		content?: ConfirmModalState['content']
		description?: ConfirmModalState['description']
		buttons?: ConfirmModalState['buttons']
		actions?: ConfirmModalState['actions']
	}) => void
}

const initialState: ConfirmModalState = {
	bears: 0,
	isOpen: false,
	title: '',
	content: '',
	buttons: { cancel: 'Cancel', confirm: 'Confirm' },
}

const useConfirmModal = create<ConfirmModalState & ConfirmModalMethod>()((set) => ({
	...initialState,

	setModalOptions: ({ content, title, buttons, description, actions, ...rest }) =>
		set((state) => ({ ...state, content, title, buttons, description, actions, isOpen: true, ...rest })),
	open: () => set(() => ({ isOpen: true })),
	close: () => set(() => ({ isOpen: false })),
	reset: () => set((state) => ({ ...state, ...initialState })),
}))

export default useConfirmModal

import { create } from 'zustand'

interface LoginModalState {
	isOpen: boolean
}

interface LoginModalMethod {
	open: () => void
	close: () => void
}

const initialState: LoginModalState = {
	isOpen: false,
}

const useLoginModal = create<LoginModalState & LoginModalMethod>()((set) => ({
	...initialState,

	open: () => set(() => ({ isOpen: true })),
	close: () => set(() => ({ isOpen: false })),
	reset: () => set((state) => ({ ...state, ...initialState })),
}))

export default useLoginModal

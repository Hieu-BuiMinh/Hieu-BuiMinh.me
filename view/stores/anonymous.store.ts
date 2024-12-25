import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const noopStorage = {
	// Internal in-memory storage object
	storage: {} as Record<string, string>,

	getItem: async (key: string): Promise<string | null> => {
		if (noopStorage.storage.hasOwnProperty(key)) {
			return noopStorage.storage[key]
		}
		return null
	},

	setItem: async (key: string, value: string): Promise<void> => {
		noopStorage.storage[key] = value
	},

	removeItem: async (key: string): Promise<void> => {
		if (noopStorage.storage.hasOwnProperty(key)) {
			delete noopStorage.storage[key]
		}
	},
}

type AnonymousState = { likes: { postSlug: string; count: number }[] }

type AnonymousStateActions = {
	addPostLikeBySlug: (postSlug: string) => void
}

const anonymousInitialState: AnonymousState = { likes: [] }

const anonymousStore = create<AnonymousState & AnonymousStateActions>()(
	persist(
		(set) => ({
			...anonymousInitialState,
			addPostLikeBySlug: (postSlug) =>
				set((state) => {
					const likeIndex = state.likes.findIndex((like) => like.postSlug === postSlug)
					if (likeIndex === -1) {
						state.likes.push({ postSlug, count: 1 })
					} else {
						state.likes[likeIndex].count += 1
					}
					return state
				}),
		}),
		{
			name: 'anonymous-store',
			onRehydrateStorage: () => (state) => {
				if (!state) {
					// if no persisted state is found, initialize to defaults
					return anonymousInitialState
				}
			},
		}
	)
)

const useAnonymousStore = anonymousStore
export default useAnonymousStore

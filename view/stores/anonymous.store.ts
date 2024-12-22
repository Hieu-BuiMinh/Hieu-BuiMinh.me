import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

type AnonymousState = { likes: { postSlug: string; count: number }[] }

type AnonymousStateActions = {
	addPostLikeBySlug: (postSlug: string) => void
}

const anonymousInitialState: AnonymousState = { likes: [] }

const anonymousStore = createStore<AnonymousState & AnonymousStateActions>()(
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
		{ name: 'anonymous-store' }
	)
)

const useAnonymousStore = () => anonymousStore.getState()
export default useAnonymousStore

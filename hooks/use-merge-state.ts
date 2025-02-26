/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

export function useMergeState<T>(initialState: T) {
	const [state, setState] = useState<T>(initialState)
	const setMergedState = (newState: Partial<T>) =>
		setState((prevState: any) => Object.assign({}, prevState, newState))
	return [state, setMergedState] as const
}

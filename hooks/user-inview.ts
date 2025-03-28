import { useEffect, useRef, useState } from 'react'

type UseInViewOptions = IntersectionObserverInit
type UseInViewReturn = [React.RefObject<HTMLElement>, boolean]

const useInView = (options: UseInViewOptions): UseInViewReturn => {
	const [isInView, setIsInView] = useState<boolean>(false)
	const ref = useRef<HTMLElement | null>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsInView(entry.isIntersecting)
		}, options)

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			if (ref.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(ref.current)
			}
		}
	}, [options])

	return [ref, isInView]
}

export default useInView

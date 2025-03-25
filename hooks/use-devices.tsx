import * as React from 'react'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useDeviceType() {
	const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'desktop' | undefined>(undefined)

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`)
		const onChange = () => {
			if (window.innerWidth < MOBILE_BREAKPOINT) {
				setDeviceType('mobile')
			} else if (window.innerWidth < TABLET_BREAKPOINT) {
				setDeviceType('tablet')
			} else {
				setDeviceType('desktop')
			}
		}
		mql.addEventListener('change', onChange)
		onChange() // Initial check
		return () => mql.removeEventListener('change', onChange)
	}, [])

	return deviceType
}

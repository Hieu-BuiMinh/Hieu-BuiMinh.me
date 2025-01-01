import React from 'react'

interface IHexagram {
	upper?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	lower?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	actives?: number[]
	className?: string
	showLabel?: boolean
	showSixRelatives?: boolean
	showSixCreatures?: boolean
	yinYangClassName?: string
}

function Hexagram({}: IHexagram) {
	return <div>Hexagram</div>
}

export default Hexagram

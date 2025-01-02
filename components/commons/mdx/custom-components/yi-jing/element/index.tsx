import { Earth, Flame, Swords, TreeDeciduous, Waves } from 'lucide-react'

const elementsMap = {
	1: <Waves size={14} />,
	2: <Flame size={14} />,
	3: <TreeDeciduous size={14} />,
	4: <Swords size={14} />,
	5: <Earth size={14} />,
	'-1': <Waves size={14} />,
	'-2': <Flame size={14} />,
	'-3': <TreeDeciduous size={14} />,
	'-4': <Swords size={14} />,
	'-5': <Earth size={14} />,
	default: <Swords size={14} />,
}

export const Element = ({ type }: { type: 1 | 2 | 3 | 4 | 5 | -1 | -2 | -3 | -4 | -5 }) => {
	const element = elementsMap[type] || elementsMap.default

	return (
		<div className="relative flex size-5 items-center justify-center rounded-full border border-green-500 bg-green-400/40">
			{element}
			<span className={'absolute -right-2 -top-2 flex size-3 items-center justify-center font-semibold'}>
				{type > 0 ? '+' : '-'}
			</span>
		</div>
	)
}

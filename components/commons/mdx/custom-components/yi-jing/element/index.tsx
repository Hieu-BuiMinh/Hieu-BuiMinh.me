type TSVGIconsProps = React.HtmlHTMLAttributes<SVGElement>
export type ElementTypeName = keyof typeof ElementsIcon

export const Element = ({ type, props }: { type: ElementTypeName; props?: TSVGIconsProps }) => {
	const Element = ElementsIcon[type] || ElementsIcon['Water']

	return <Element {...props} />
}

export const ElementsIcon = {
	Water: (props: TSVGIconsProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="#7dd3fc"
			stroke="#0369a1"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-droplet"
			{...props}
		>
			<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
		</svg>
	),
	Fire: (props: TSVGIconsProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="#fbbf24"
			stroke="#dc2626"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-flame"
			{...props}
		>
			<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
		</svg>
	),
	Wood: (props: TSVGIconsProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="#86efac"
			stroke="#4d7c0f"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-tree-deciduous"
			{...props}
		>
			<path d="M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"></path>
			<path d="M12 19v3"></path>
		</svg>
	),
	Mental: (props: TSVGIconsProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="#ffffff"
			stroke="#334155"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-swords"
			{...props}
		>
			<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline>
			<line x1="13" x2="19" y1="19" y2="13"></line>
			<line x1="16" x2="20" y1="16" y2="20"></line>
			<line x1="19" x2="21" y1="21" y2="19"></line>
			<polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline>
			<line x1="5" x2="9" y1="14" y2="18"></line>
			<line x1="7" x2="4" y1="17" y2="20"></line>
			<line x1="3" x2="5" y1="19" y2="21"></line>
		</svg>
	),
	Earth: (props: TSVGIconsProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="#d97706"
			stroke="#7c2d12"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-mountain"
			{...props}
		>
			<path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
		</svg>
	),
}

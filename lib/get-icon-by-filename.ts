import { FileIcon, TerminalIcon } from 'lucide-react'
import { SiHtml5, SiJavascript, SiMarkdown, SiMdx, SiNodedotjs, SiReact, SiTypescript } from 'react-icons/si'

type Icon = {
	extensions?: string[]
	filenames?: string[]
	icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const icons: Icon[] = [
	{
		extensions: ['js', 'mjs', 'cjs'],
		icon: SiJavascript,
	},
	{
		extensions: ['ts', 'mts', 'cts'],
		icon: SiTypescript,
	},
	{
		extensions: ['jsx', 'tsx'],
		icon: SiReact,
	},
	{
		extensions: ['sh', 'bash', 'zsh'],
		icon: TerminalIcon,
	},
	{
		extensions: ['html'],
		icon: SiHtml5,
	},
	{
		extensions: ['md'],
		icon: SiMarkdown,
	},
	{
		extensions: ['mdx'],
		icon: SiMdx,
	},
	{
		filenames: ['package.json'],
		icon: SiNodedotjs,
	},
]

const filenameToIcon = new Map<string, React.FC<React.SVGProps<SVGSVGElement>>>()
const extensionToIcon = new Map<string, React.FC<React.SVGProps<SVGSVGElement>>>()

for (const icon of icons) {
	if (icon.filenames) {
		for (const filename of icon.filenames) {
			filenameToIcon.set(filename, icon.icon)
		}
	}
	if (icon.extensions) {
		for (const extension of icon.extensions) {
			extensionToIcon.set(extension, icon.icon)
		}
	}
}

export const getIconByFilename = (filename: string): React.FC<React.SVGProps<SVGSVGElement>> => {
	if (filenameToIcon.has(filename)) {
		return filenameToIcon.get(filename)!
	}

	const extension = filename.split('.').pop()

	if (extension && extensionToIcon.has(extension)) {
		return extensionToIcon.get(extension)!
	}

	return FileIcon
}

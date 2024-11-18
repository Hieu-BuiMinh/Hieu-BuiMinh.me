import { FileIcon } from 'lucide-react'
import type React from 'react'
import { IoTerminal } from 'react-icons/io5'
import { SiHtml5, SiJavascript, SiMarkdown, SiMdx, SiNodedotjs, SiReact, SiTypescript } from 'react-icons/si'

interface ILangIconsProps {
	fileName?: string
	className?: string
}
export const LangIcons = ({ fileName, className, ...props }: ILangIconsProps) => {
	const Icons = [
		{
			extensions: ['js', 'mjs', 'cjs'],
			icon: <SiJavascript className={className} {...props} color="#f1dc50" />,
		},
		{
			extensions: ['ts', 'mts', 'cts'],
			icon: <SiTypescript className={className} {...props} color="#5794e8" />,
		},
		{
			extensions: ['jsx', 'tsx'],
			icon: <SiReact className={className} {...props} color="#5386d6" />,
		},
		{
			extensions: ['sh', 'bash', 'zsh', 'terminal'],
			icon: <IoTerminal size={14} className={className} {...props} color="#00a6ed" />,
		},
		{
			extensions: ['html'],
			icon: <SiHtml5 className={className} {...props} color="#f7622c" />,
		},
		{
			extensions: ['md'],
			icon: <SiMarkdown className={className} {...props} color="#f9ac00" />,
		},
		{
			extensions: ['mdx'],
			icon: <SiMdx className={className} {...props} color="#f9ac00" />,
		},
		{
			filenames: ['package.json'],
			icon: <SiNodedotjs className={className} {...props} color="#83cd29" />,
		},
	]

	const filenameToIcon = new Map<string, React.JSX.Element>()
	const extensionToIcon = new Map<string, React.JSX.Element>()

	for (const icon of Icons) {
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

	if (!fileName) {
		return <FileIcon size={14} className={className} {...props} />
	}

	if (filenameToIcon.has(fileName)) {
		return filenameToIcon.get(fileName)!
	}

	const extension = fileName.split('.').pop()

	if (extension && extensionToIcon.has(extension)) {
		return extensionToIcon.get(extension)!
	}

	return <FileIcon size={14} className={className} {...props} />
}

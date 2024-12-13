import './style/code-block.css'

import Link from 'next/link'
import * as runtime from 'react/jsx-runtime'

import ShowcaseGrid from '@/components/commons/grid/showcase-grid'
import ImageZoom from '@/components/commons/image/image-zoom'
import BlockQuote from '@/components/commons/mdx/custom-components/block-quote'
import { CodeBlock } from '@/components/commons/mdx/custom-components/code-block'
import Heading from '@/components/commons/mdx/custom-components/heading'
import LinkCard from '@/components/commons/mdx/custom-components/link-card'
import TreeView from '@/components/commons/tree-view'

const useMDXComponent = (code: string) => {
	if (!code) {
		return
	}
	const fn = new Function(code)
	return fn({ ...runtime })?.default
}

const components = {
	h2: (props: React.ComponentPropsWithoutRef<'h2'>) => <Heading as="h2" {...props} />,
	h3: (props: React.ComponentPropsWithoutRef<'h3'>) => <Heading as="h3" {...props} />,
	h4: (props: React.ComponentPropsWithoutRef<'h4'>) => <Heading as="h4" {...props} />,
	h5: (props: React.ComponentPropsWithoutRef<'h5'>) => <Heading as="h5" {...props} />,
	h6: (props: React.ComponentPropsWithoutRef<'h6'>) => <Heading as="h6" {...props} />,
	a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
		const { children, href, ...rest } = props

		if (!href) {
			return (
				<span className="text-muted-foreground line-through transition-colors hover:text-foreground" {...rest}>
					{children}
				</span>
			)
		}

		return (
			<Link
				className="font-bold text-green-600 no-underline transition-colors hover:text-foreground hover:underline dark:text-green-400"
				href={href}
				{...rest}
			>
				{children}
			</Link>
		)
	},
	Image: (props: React.ComponentPropsWithoutRef<typeof ImageZoom>) => {
		const { alt, ...rest } = props

		return (
			<>
				<ImageZoom className="rounded-lg border" alt={alt || ''} width={1200} height={630} {...rest} />
				<figcaption className="mt-4 text-center">{alt}</figcaption>
			</>
		)
	},
	// code: (props) => {
	// 	return <>{props.children} 123</>
	// },
	// pre: CodeBlock,
	CodeBlock,
	LinkCard,
	TreeView,
	BlockQuote,
	ShowcaseGrid,
}

interface MdxProps {
	code: string
}

export function MDXContent({ code }: MdxProps) {
	const Component = useMDXComponent(code)
	if (!code) {
		return <p className="py-5">This post is on updating 🧪...</p>
	}
	return <Component components={components} />
}

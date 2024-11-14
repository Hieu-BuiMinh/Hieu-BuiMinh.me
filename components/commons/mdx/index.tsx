import Link from 'next/link'
import * as runtime from 'react/jsx-runtime'

import ImageZoom from '@/components/commons/image/image-zoom'
import { CodeBlock } from '@/components/commons/mdx/custom-components/code-block'
import Heading from '@/components/commons/mdx/custom-components/heading'
import LinkCard from '@/components/commons/mdx/custom-components/link-card'

const useMDXComponent = (code: string) => {
	const fn = new Function(code)
	return fn({ ...runtime }).default
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
				<ImageZoom className="rounded-lg border" alt={alt} {...rest} />
				<figcaption className="mt-4 text-center">{alt}</figcaption>
			</>
		)
	},
	pre: CodeBlock,
	LinkCard,
}

interface MdxProps {
	code: string
}

export function MDXContent({ code }: MdxProps) {
	const Component = useMDXComponent(code)
	return <Component components={components} />
}

'use client'

import './style/code-block.css'
import './style/yin-yang.css'

import * as LucideIcons from 'lucide-react'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import * as runtime from 'react/jsx-runtime'

import AlertBadge from '@/components/commons/alert/alert-badge'
import CarouselSlice from '@/components/commons/carousel'
import ShowcaseGrid from '@/components/commons/grid/showcase-grid'
import { SVGIcons } from '@/components/commons/icons/svg-icons'
import CloudinaryImage from '@/components/commons/image/cloudinary-image'
import ImageZoom from '@/components/commons/image/image-zoom'
import Audio from '@/components/commons/mdx/custom-components/audio'
import BlockQuote from '@/components/commons/mdx/custom-components/block-quote'
import { CodeBlock } from '@/components/commons/mdx/custom-components/code-block'
import Heading from '@/components/commons/mdx/custom-components/heading'
import LinkCard from '@/components/commons/mdx/custom-components/link-card'
import RetroList from '@/components/commons/mdx/custom-components/retro/retro-list'
import Table from '@/components/commons/mdx/custom-components/table'
import Bagua from '@/components/commons/mdx/custom-components/yi-jing/bagua'
import Hexagram from '@/components/commons/mdx/custom-components/yi-jing/hexagram'
import YinYang from '@/components/commons/mdx/custom-components/yi-jing/yin-yang'
import TreeView from '@/components/commons/tree-view'
import Video from '@/components/commons/video'
import CloudinaryVideo from '@/components/commons/video/cloudinary-video'
import VideoZoom from '@/components/commons/video/video-zoom'
import { cn } from '@/lib/utils'
import AboutTheName from '@/view/route/about/components/about-the-name'
import ExperienceBlock from '@/view/route/experiences/components/experience-block'

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
	p: (props: React.ComponentPropsWithRef<'p'>) => (
		<p className="text-sm text-foreground dark:text-muted-foreground md:text-base">{props.children}</p>
	),
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
		const { alt, className, ...rest } = props

		return (
			<>
				<ImageZoom
					className={cn('h-[530px] rounded-lg border', className)}
					alt={alt || ''}
					width={1200}
					height={630}
					{...rest}
				/>
				{alt && <figcaption className="mt-4 text-center">{alt}</figcaption>}
			</>
		)
	},
	ExperienceBlock,
	CloudinaryImage,
	CloudinaryVideo,
	Audio,
	Video,
	VideoZoom,
	CodeBlock,
	LinkCard,
	TreeView,
	BlockQuote,
	ShowcaseGrid,
	Table,
	LucideIcons,
	SVGIcons,
	CarouselSlice,
	RetroList,
	AboutTheName,
	AlertBadge,

	// Iching here
	YinYang,
	Bagua,
	Hexagram,
}

interface MdxProps {
	code: string
}

export function MDXContent({ code }: MdxProps) {
	const Component = useMDXComponent(code)
	if (!code) {
		return <p className="py-5">The content is on updating 🧪...</p>
	}
	return <Component components={components} key={nanoid()} />
}

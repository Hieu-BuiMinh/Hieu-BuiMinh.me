import type { SVGIconComponent } from '@/components/commons/icons/svg-icons'
import { SVGIcons } from '@/components/commons/icons/svg-icons'

export const isProduction = process.env.NODE_ENV === 'production'

export const SITE_CONFIG = {
	name: 'Hieu.BuiMinh',
	shortName: 'Hieu.BM',
	url: isProduction ? 'https://hieu-buiminh.vercel.app/' : 'http://localhost:3000',
	description: 'Next js 15 blog using velite, tailwind and shadcn',
	siteKeywords: ['hieu.buiminh', 'next.js', 'react', 'typeScript', 'node.js', 'tailwind', 'shadcn'],
	og: '/assets/images/og.png',
	author: {
		avatar: '/assets/images/avt/avt_001.jpg',
		name: 'Hieu.BuiMinh',
		nickname: 'Walter',
		github: 'https://github.com/Hieu-BuiMinh',
	},
	links: {
		twitter: 'https://x.com/Walter_BM_777',
		youtube: 'https://x.com/Walter_BM_777',
		instagram: 'https://x.com/Walter_BM_777',
		facebook: 'https://www.facebook.com/hieu.buiminh.37',
		github: 'https://github.com/Hieu-BuiMinh',
		linkedin: 'https://www.linkedin.com/in/minh-hieu-bui-78a315208',
		personalSite: '/',
	},
	logos: {
		light: '/assets/images/logo/logo-circle-light.svg',
		dark: '/assets/images/logo/logo-circle-dark.svg',
	},
}

export type SITE_CONFIG = typeof SITE_CONFIG

export const SOCIAL_LINKS: {
	label: string
	icon: SVGIconComponent
	href: string
}[] = [
	{
		label: 'GitHub',
		icon: SVGIcons.gitHub,
		href: SITE_CONFIG.links.github,
	},
	{
		label: 'Twitter',
		icon: SVGIcons.X,
		href: SITE_CONFIG.links.twitter,
	},
]

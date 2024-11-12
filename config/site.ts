export const isProduction = process.env.NODE_ENV === 'production'

export const siteConfig = {
	name: 'Hieu.BuiMinh',
	shortName: 'Hieu.BM',
	url: isProduction ? 'https://hieu-buiminh.vercel.app/' : 'http://localhost:3000',
	description: 'Next js 15 blog using velite, tailwind and shadcn',
	siteKeywords: ['hieu.buiminh', 'next.js', 'react', 'typeScript', 'node.js', 'tailwind', 'shadcn'],
	author: {
		avatar: '/assets/images/avt/avt_001.jpg',
		name: 'Hieu.BuiMinh',
		nickname: 'Walter',
		github: 'https://github.com/Hieu-BuiMinh',
	},
	links: {
		twitter: 'https://x.com/Walter_BM_777',
		facebook: 'https://www.facebook.com/hieu.buiminh.37',
		github: 'https://github.com/Hieu-BuiMinh',
		personalSite: '/',
	},
}

export type SiteConfig = typeof siteConfig

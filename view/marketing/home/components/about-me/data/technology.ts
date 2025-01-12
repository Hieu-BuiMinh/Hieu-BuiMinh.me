import type { SVGIcon } from '@/components/commons/icons/svg-icons'

export const technologies = [
	{
		name: 'Tailwind CSS',
		icon: 'TailwindCSS',
		url: 'https://tailwindcss.com',
	},
	{
		name: 'React',
		icon: 'React',
		url: 'https://react.dev',
	},
	{
		name: 'Next.js',
		icon: 'NextJS',
		url: 'https://nextjs.org',
	},
	{
		name: 'Tanstack',
		icon: 'Tanstack',
		url: 'https://tanstack.com/query/latest',
	},
	{
		name: 'Node.js',
		icon: 'Node',
		url: 'https://nodejs.org',
	},
	{
		name: 'TypeScript',
		icon: 'TypeScript',
		url: 'https://www.typescriptlang.org',
	},
	{
		name: 'JavaScript',
		icon: 'JavaScript',
		url: 'https://www.javascripttutorial.net',
	},
	{
		name: 'Turborepo',
		icon: 'Turborepo',
		url: 'https://turbo.build/repo',
	},
	{
		name: 'SWC',
		icon: 'SWC',
		url: 'https://swc.rs',
	},
	{
		name: 'JWT',
		icon: 'Jwt',
		url: 'https://jwt.io',
	},
	{
		name: 'Swagger',
		icon: 'Swagger',
		url: 'https://swagger.io',
	},
	{
		name: 'Zod',
		icon: 'Zod',
		url: 'https://zod.dev',
	},
	{
		name: 'Md',
		icon: 'Md',
		url: 'https://www.markdownguide.org',
	},
	{
		name: 'Mdx',
		icon: 'Mdx',
		url: 'https://mdxjs.com',
	},
	{
		name: 'Velite',
		icon: 'Velite',
		url: 'https://velite.js.org',
	},
	{
		name: 'Vercel',
		icon: 'Vercel',
		url: 'https://vercel.com',
	},
	{
		name: 'Github',
		icon: 'gitHub',
		url: 'https://github.com',
	},
	{
		name: 'Firebase',
		icon: 'Firebase',
		url: 'https://firebase.google.com',
	},
] as const satisfies Technology[]

export const frontEndTechnologies = [
	{
		name: 'Tailwind CSS',
		icon: 'TailwindCSS',
		url: 'https://tailwindcss.com',
	},
	{
		name: 'React',
		icon: 'React',
		url: 'https://react.dev',
	},
	{
		name: 'Next.js',
		icon: 'NextJS',
		url: 'https://nextjs.org',
	},
	{
		name: 'Tanstack',
		icon: 'Tanstack',
		url: 'https://tanstack.com/query/latest',
	},
	{
		name: 'TypeScript',
		icon: 'TypeScript',
		url: 'https://www.typescriptlang.org',
	},
	{
		name: 'JavaScript',
		icon: 'JavaScript',
		url: 'https://www.javascripttutorial.net',
	},
	{
		name: 'Turborepo',
		icon: 'Turborepo',
		url: 'https://turbo.build/repo',
	},
	{
		name: 'Swagger',
		icon: 'Swagger',
		url: 'https://swagger.io',
	},
] as const satisfies Technology[]

export const backEndTechnologies = [
	{
		name: 'Md',
		icon: 'Md',
		url: 'https://www.markdownguide.org',
	},
	{
		name: 'Mdx',
		icon: 'Mdx',
		url: 'https://mdxjs.com',
	},
	{
		name: 'Node.js',
		icon: 'Node',
		url: 'https://nodejs.org',
	},
	{
		name: 'JWT',
		icon: 'Jwt',
		url: 'https://jwt.io',
	},
	{
		name: 'Zod',
		icon: 'Zod',
		url: 'https://zod.dev',
	},
	{
		name: 'Firebase',
		icon: 'Firebase',
		url: 'https://firebase.google.com',
	},
	{
		name: 'Velite',
		icon: 'Velite',
		url: 'https://velite.js.org',
	},
	{
		name: 'Vercel',
		icon: 'Vercel',
		url: 'https://vercel.com',
	},
	{
		name: 'Github',
		icon: 'gitHub',
		url: 'https://github.com',
	},
	{
		name: 'SWC',
		icon: 'SWC',
		url: 'https://swc.rs',
	},
	{
		name: 'Figma',
		icon: 'Figma',
		url: 'https://figma.com',
	},
] as const satisfies Technology[]

export interface Technology {
	name: string
	url: string
	icon: SVGIcon
}

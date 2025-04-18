import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./view/**/*.{js,ts,jsx,tsx,mdx}',
		'./content/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: {
						height: '0',
					},
				},
				// Animated Badge
				flip: {
					to: {
						transform: 'rotate(360deg)',
					},
				},
				rotate: {
					to: {
						transform: 'rotate(90deg)',
					},
				},
				// Marquee
				'marquee-left': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(calc(-100% - var(--gap)))' },
				},
				'marquee-up': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(calc(-100% - var(--gap)))' },
				},
				// Bounce
				bounce: {
					'0%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
					},
					'50%': {
						transform: 'translateY(-20%)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
					},
					'100%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
					},
				},
				// Linear gradient running
				'gradient-running': {
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// Animated Badge
				flip: 'flip 6s infinite steps(2, end)',
				rotate: 'rotate 3s linear infinite both',
				// Marquee
				'marquee-left': 'marquee-left var(--duration, 15s) linear infinite',
				'marquee-up': 'marquee-up var(--duration, 15s) linear infinite',
				// Bounce
				bounce: 'bounce 1s infinite',
				// Linear gradient running
				'gradient-running': 'gradient-running var(--duration, 8s) ease infinite',
			},
			boxShadow: {
				'feature-card': '0 -1px 3px 0 rgb(0 0 0 / 0.05)',
				'feature-card-dark': '0 0 0 1px rgb(255 255 255 / 0.06), 0 -1px rgb(255 255 255 / 0.1)',
				'yin-yang':
					'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -2.5px, rgba(0, 0, 0, 0.2) 0px -2.5px 0px inset',
			},
			backgroundImage: {
				pinned: 'linear-gradient(45deg, #20f961 0%, #20f9ce 17%, #20b8f9 34%, #204bf9 51%, #6120f9 68%, #ce20f9 85%, #f920b8 102%)',
				'pinned-dark': 'linear-gradient(to right, #3b82f6, #6366f1, #db2777)',
				'doc-header-gradient': 'radial-gradient(49.63% 57.02% at 58% -7.2%, #89b5fa1a 35.4%, transparent 100%)',
				// 'stripes': 'linear-gradient(135deg,#ec489980 10%,#0000 0,#0000 50%,#ec489980 0,#ec489980 60%,#0000 0,#0000)',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
export default config

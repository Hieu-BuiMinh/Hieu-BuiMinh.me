'use client'

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'

import { Toaster } from '@/components/commons/toaster'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider defaultTheme="dark" {...props}>
			{children}
			<Toaster />
		</NextThemesProvider>
	)
}

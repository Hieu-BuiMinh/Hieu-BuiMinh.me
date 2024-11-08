import React from 'react'

import { ThemeProvider } from '@/components/commons/providers/shadcn-provider'

function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				{children}
			</ThemeProvider>
		</>
	)
}

export default AppProvider

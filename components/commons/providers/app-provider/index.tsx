import React from 'react'

import Hello from '@/components/commons/intro/hello'
import { ThemeProvider } from '@/components/commons/providers/shadcn-provider'

function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<Hello />
				{children}
			</ThemeProvider>
		</>
	)
}

export default AppProvider

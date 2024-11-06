import React from 'react'

import { ModeToggle } from '@/components/commons/mode-toggle'
import { ThemeProvider } from '@/components/commons/providers/shadcn-provider'

function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<ModeToggle />
				{children}
			</ThemeProvider>
		</>
	)
}

export default AppProvider

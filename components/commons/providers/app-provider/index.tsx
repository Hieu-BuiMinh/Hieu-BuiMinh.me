import React from 'react'

import Hello from '@/components/commons/intro/hello'
import ConfirmModal from '@/components/commons/modals/confirm-modal'
import { ConvexClientProvider } from '@/components/commons/providers/convex-provider'
import { ThemeProvider } from '@/components/commons/providers/shadcn-provider'

function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
			<ConvexClientProvider>
				<Hello />
				{children}
				<ConfirmModal />
			</ConvexClientProvider>
		</ThemeProvider>
	)
}

export default AppProvider

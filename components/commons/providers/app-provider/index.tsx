import Script from 'next/script'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import React from 'react'

import Hello from '@/components/commons/intro/hello'
import ConfirmModal from '@/components/commons/modals/confirm-modal'
import LoginModal from '@/components/commons/modals/login-modal'
import { ConvexClientProvider } from '@/components/commons/providers/convex-provider'
import { ThemeProvider } from '@/components/commons/providers/shadcn-provider'

function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
			<ConvexClientProvider>
				<Hello />
				<NuqsAdapter>{children}</NuqsAdapter>
				<ConfirmModal />
				<LoginModal />
			</ConvexClientProvider>

			<Script
				defer
				src="https://cloud.umami.is/script.js"
				data-website-id="e33a48b3-c890-4ba6-9430-947be1127fc0"
			/>
		</ThemeProvider>
	)
}

export default AppProvider

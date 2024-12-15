'use client'

import { ClerkProvider, useAuth } from '@clerk/clerk-react'
import { dark, experimental__simple } from '@clerk/themes'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useTheme } from 'next-themes'
import type { ReactNode } from 'react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	const { resolvedTheme } = useTheme()
	return (
		<ClerkProvider
			appearance={{
				baseTheme: resolvedTheme === 'dark' ? dark : experimental__simple,
			}}
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}

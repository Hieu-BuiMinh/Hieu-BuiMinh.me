/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import React from 'react'

interface IRetroCard {
	post: {
		id: string
		slug: string
		title: string
		date: string
		year: string
		lastUpdated?: string
		cover?: string
		video?: File
		metadata?: {
			[key: string]: any
		}

		description?: string
		published?: boolean
		shown?: boolean
		tags?: string[]
		body: string
		links?: {
			repoUrl: string
			demoUrl: string
		}[]
		author: {
			avatar: string
			name: string
			github: string
		}
		toc: {
			tight: boolean
			ordered: boolean
			maxDepth: number
		}
	}
}

function RetroCard({ post }: IRetroCard) {
	return (
		<Link href={post.slug || ''} className="not-prose group block h-full rounded-md no-underline">
			<div className="relative isolate overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 px-6 py-9 dark:border-neutral-800 dark:bg-neutral-900">
				<span
					className="absolute -bottom-8 -right-4 z-[-1] text-9xl font-extrabold text-neutral-200 opacity-20 duration-300 ease-in group-hover:opacity-90 dark:text-neutral-800"
					style={{
						textShadow: `
							-0.3px 0 hsla(var(--muted-foreground)),
							0 0.3px hsla(var(--muted-foreground)),
							0.3px 0 hsla(var(--muted-foreground)),
							0 -0.3px hsla(var(--muted-foreground))`,
					}}
				>
					{post.year}
				</span>

				<p className="relative mt-3 truncate text-xl font-bold text-foreground/70 transition-colors group-hover:text-foreground">
					{post.title}
				</p>
				<p className="mt-2 text-muted-foreground transition-colors group-hover:text-foreground">
					{post.description}
				</p>
			</div>
		</Link>
	)
}

export default RetroCard

import type { TreeViewProps } from '@/components/commons/tree-view'
import TreeView from '@/components/commons/tree-view'
import HeroSection from '@/view/marketing/home/components/hero-section'

const tree: TreeViewProps = {
	expandAll: false,
	defaultExpandIds: ['1.1', '1.2'],
	data: [
		{
			id: '1',
			name: 'src',
			children: [
				{
					id: '1.1',
					name: 'components',
					children: [
						{ id: '1.1.1', name: 'Button.tsx' },
						{ id: '1.1.2', name: 'Card.tsx' },
						{ id: '1.1.3', name: 'Input.tsx' },
					],
				},
				{
					id: '1.2',
					name: 'pages',
					children: [
						{ id: '1.2.1', name: 'index.tsx' },
						{ id: '1.2.2', name: 'about.tsx' },
						{ id: '1.2.3', name: 'contact.tsx' },
					],
				},
			],
		},
		{ id: '2', name: 'package.json' },
		{ id: '3', name: 'tsconfig.json' },
		{ id: '4', name: 'README.md' },
	],
}

function HomePageView() {
	return (
		<div className="m-auto max-w-screen-lg p-3 md:py-6">
			<HeroSection />
			<TreeView data={tree.data} expandAll={tree.expandAll} defaultExpandIds={tree.defaultExpandIds} />
		</div>
	)
}

export default HomePageView

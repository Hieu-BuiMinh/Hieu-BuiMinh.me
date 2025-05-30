import { build } from 'velite'

/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	reactStrictMode: false,
	images: {
		// domains: ['img.clerk.com', 'i.imgur.com', 'res.cloudinary.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
			{
				protocol: 'https',
				hostname: 'i.imgur.com',
			},
			{
				protocol: 'https',
				hostname: 'i.ibb.co',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},
	webpack: (config) => {
		config.plugins.push(new VeliteWebpackPlugin())
		return config
	},
}

class VeliteWebpackPlugin {
	static started = false
	constructor(/** @type {import('velite').Options} */ options = {}) {
		this.options = options
	}
	apply(/** @type {import('webpack').Compiler} */ compiler) {
		compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
			if (VeliteWebpackPlugin.started) return
			VeliteWebpackPlugin.started = true
			const dev = compiler.options.mode === 'development'
			this.options.watch = this.options.watch ?? dev
			this.options.clean = this.options.clean ?? !dev
			await build(this.options)
		})
	}
}

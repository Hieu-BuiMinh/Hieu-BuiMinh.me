import type { NextConfig } from 'next'
import { build } from 'velite'
import type { Compiler } from 'webpack'

class VeliteWebpackPlugin {
	static started = false

	apply(compiler: Compiler): void {
		compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
			if (VeliteWebpackPlugin.started) return
			VeliteWebpackPlugin.started = true

			const dev = compiler.options.mode === 'development'
			await build({ watch: dev, clean: !dev })
		})
	}
}

const nextConfig: NextConfig = {
	/* config options here */
	webpack: (config) => {
		config?.plugins?.push(new VeliteWebpackPlugin())
		return config
	},
}

export default nextConfig

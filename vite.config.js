import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
			manifest: {
				name: 'Color Palette Generator',
				short_name: 'PaletteGen',
				description: 'AI-powered color palette generator from images',
				theme_color: '#4F46E5',
				background_color: '#ffffff',
				icons: [
					{
						src: '/icons/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icons/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/icons/apple-touch-icon.png',
						sizes: '180x180',
						type: 'image/png',
						purpose: 'apple touch icon'
					},
					{
						src: '/icons/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			}
		})
	],
	optimizeDeps: {
		include: ['vue', 'colorthief']
	},
	build: {
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					'vendor': ['vue'],
					'image-processing': ['colorthief', 'html2canvas'],
					'voice': ['annyang']
				}
			}
		}
	}
})

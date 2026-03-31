<template>
	<div>
		<Header />

		<!-- QOL-2: declarative hidden file input driven by uploadImage() -->
		<input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="handleFileChange" />

		<main class="max-w-screen-2xl mx-auto px-8 pt-16 pb-24">

			<!-- Hero Section: Editorial Intro -->
			<section class="mb-24">
				<div class="flex flex-col md:flex-row gap-16 items-end">
					<div class="md:w-2/3">
						<span
							class="font-label text-xs uppercase tracking-[0.3em] text-[#acabaa] mb-6 block">Visual Chromatics / Professional Tooling</span>
						<h1
							class="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter leading-none mb-8">
							Visual <br /><span class="text-[#b9b9b7]">Chromatics.</span>
						</h1>
						<p class="font-body text-xl text-[#acabaa] max-w-xl leading-relaxed">
						Pull colors from any image and get CSS-ready palettes in seconds. Works with Unsplash search or your own files.
						</p>
					</div>
					<div class="md:w-1/3 flex flex-col gap-4">
						<div class="bg-[#252626] p-1 flex items-center rounded-sm">
							<span class="material-symbols-outlined px-3 text-[#acabaa]">search</span>
							<input v-model="query" type="text" placeholder="Search Unsplash..."
								class="bg-transparent border-none focus:ring-0 w-full font-label text-sm py-3 text-[#e7e5e4] placeholder:text-[#767575]"
								@keydown.enter="fetchImage" />
							<button v-if="listening" @click="toggleVoiceSearch"
								class="px-3 text-[#acabaa] animate-pulse">
								<span class="material-symbols-outlined">mic_off</span>
							</button>
							<button v-else @click="toggleVoiceSearch" class="px-3 text-[#acabaa]">
								<span class="material-symbols-outlined">mic</span>
							</button>
							<button @click="fetchImage"
								class="bg-gray-50 text-[#3f403f] px-4 py-2 m-1 rounded-sm text-sm font-bold tracking-tight hover:brightness-110 transition-all">
								Search
							</button>
						</div>
						<button @click="uploadImage"
							class="bg-[#1f2020] text-[#e7e5e4] border border-[#484848]/20 py-4 rounded-sm flex items-center justify-center gap-3 hover:bg-[#2c2c2c] transition-colors">
							<span class="material-symbols-outlined">upload_file</span>
							<span class="font-label text-xs uppercase tracking-widest font-semibold">Upload
								Image</span>
						</button>
						<!-- Suggestion chips -->
						<div class="flex flex-wrap gap-2">
							<button v-for="suggestion in suggestions" :key="suggestion"
								@click="searchSuggestion(suggestion)"
								class="px-3 py-1 bg-[#191a1a] hover:bg-[#252626] border border-[#484848]/30 rounded-sm text-xs text-[#acabaa] hover:text-[#e7e5e4] transition-colors font-label uppercase tracking-wider">
								{{ suggestion }}
							</button>
						</div>
					</div>
				</div>
			</section>

			<!-- Main Workspace: Image & Extraction -->
			<section class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
				<!-- Image Canvas -->
				<div class="lg:col-span-7 bg-[#131313] p-2 rounded-sm relative group overflow-hidden">
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
					</div>

					<!-- Loaded image -->
					<img v-if="imageUrl" :src="imageUrl" alt="Source image for color palette"
						class="w-full h-[600px] object-cover rounded-sm transition-all duration-700"
						crossorigin="anonymous" />

					<!-- Placeholder skeleton -->
					<div v-else class="w-full h-[600px] bg-[#252626] rounded-sm animate-pulse flex items-center justify-center">
						<span class="material-symbols-outlined text-[#484848] text-6xl">image</span>
					</div>

					<div class="absolute top-8 right-8 flex gap-2">
						<button @click="refreshImage"
							class="glass-panel p-3 rounded-sm text-[#f9f9f9] hover:scale-105 transition-transform">
							<span class="material-symbols-outlined">refresh</span>
						</button>
					</div>

					<!-- Photographer credit -->
					<p v-if="isUnsplashImage && photographerName"
							class="mt-2 px-1 text-[10px] font-label uppercase tracking-widest text-[#9a9a9a] flex items-center gap-1">
						<span class="material-symbols-outlined text-sm">photo_camera</span>
						Photo by
						<a :href="`${photographerProfile}?utm_source=visual_chromatics&utm_medium=referral`"
							target="_blank" class="text-[#acabaa] hover:text-[#c7c6c5] ml-1">{{ photographerName }}</a>
						<span class="mx-1">on</span>
						<a href="https://unsplash.com?utm_source=visual_chromatics&utm_medium=referral"
							target="_blank" class="text-[#acabaa] hover:text-[#c7c6c5]">Unsplash</a>
					</p>
				</div>

			<!-- Extraction Panel -->
			<div class="lg:col-span-5 flex flex-col justify-between self-start">
					<div>
						<div class="flex items-center justify-between mb-8">
							<h2 class="text-[#e7e5e4] text-3xl font-headline font-bold tracking-tight">Extracted Spectrum</h2>
						<div class="flex gap-2 items-center">
							<span class="font-label text-[10px] uppercase tracking-widest text-[#9a9a9a]">Colors:</span>
								<button v-for="size in [5, 7, 9]" :key="size" @click="changePaletteSize(size)"
									class="px-3 py-1 rounded-sm text-xs font-label uppercase tracking-widest text-[#acabaa] hover:bg-[#252626] transition-colors border border-transparent"
									:class="{ 'border-[#484848] text-[#e7e5e4] bg-[#1f2020]': paletteSize === size }">
									{{ size }}
								</button>
							</div>
						</div>

						<!-- Color items -->
					<div class="space-y-4 max-h-[250px] overflow-y-auto pr-1">
<div v-if="colors.length === 0" class="flex flex-col items-center justify-center gap-6 py-8 text-center">
							<p class="text-[#acabaa] text-sm">Search an image or upload your own to get started</p>
							<div class="flex gap-8">
								<div class="flex flex-col items-center gap-2 text-[#9a9a9a]">
									<span class="material-symbols-outlined text-3xl">search</span>
									<span class="font-label text-[10px] uppercase tracking-widest">Search</span>
								</div>
								<div class="text-[#484848] self-center text-sm">or</div>
								<div class="flex flex-col items-center gap-2 text-[#9a9a9a]">
									<span class="material-symbols-outlined text-3xl">upload_file</span>
									<span class="font-label text-[10px] uppercase tracking-widest">Upload</span>
									</div>
								</div>
							</div>

							<div v-for="(color, index) in colors" :key="index" class="flex items-center gap-6 group cursor-pointer pl-2"
								@click="applyColor(color)">
								<div :style="{ backgroundColor: color }"
									class="w-28 h-14 rounded-sm shrink-0 shadow-2xl transition-transform group-hover:scale-105"
									:class="{ 'ring-2 ring-[#c7c6c5]': activeColor === color }">
								</div>
								<div class="flex flex-col gap-1">
									<span
										class="font-label text-[10px] uppercase tracking-widest text-[#acabaa]">{{ getColorName(color) }}</span>
									<span class="text-[#e7e5e4] text-2xl font-headline font-bold tracking-tighter">{{ rgbToHex(color)
										}}</span>
										<span class="font-label text-[10px] text-[#9a9a9a]">{{ color }}</span>
								</div>
								<button @click.stop="copyColor(color)"
									class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
									<span class="material-symbols-outlined text-[#c7c6c5]">content_copy</span>
								</button>
							</div>
						</div>
					</div>

					<!-- Code Generation -->
					<div class="mt-12 bg-[#191a1a] p-6 rounded-sm border border-[#484848]/10">
						<div class="flex justify-between items-center mb-4">
							<div class="flex gap-2">
								<button v-for="fmt in ['RGB', 'HEX', 'HSL']" :key="fmt"
									@click="setFormat(fmt)"
									class="font-label text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm transition-colors"
									:class="formatType === fmt ? 'bg-[#252626] text-[#e7e5e4]' : 'text-[#9a9a9a] hover:text-[#acabaa]'">
									{{ fmt }}
								</button>
							</div>
							<div class="flex gap-3 items-center">
								<button @click="toggleLockPalette"
									class="text-[#acabaa] hover:text-[#f9f9f9] transition-colors"
									:title="paletteLocked ? 'Unlock palette' : 'Lock palette'">
									<span class="material-symbols-outlined" :class="{ 'text-[#c7c6c5]': paletteLocked }">
										{{ paletteLocked ? 'lock' : 'lock_open' }}
									</span>
								</button>
								<button @click="copyCSSToClipboard"
									class="text-[10px] font-bold uppercase tracking-widest text-[#c7c6c5] hover:underline">Copy
									All</button>
							</div>
						</div>
						<code class="block font-label text-[11px] leading-relaxed text-[#c1bfbe] whitespace-pre">{{ cssContent }}</code>
					</div>

					<!-- Export button -->
					<button v-if="colors.length > 0" @click="exportToPNG"
						class="mt-4 w-full py-3 border border-[#484848]/30 text-xs font-bold uppercase tracking-[0.2em] text-[#acabaa] hover:bg-[#e7e5e4] hover:text-[#0e0e0e] transition-colors rounded-sm">
						<span class="material-symbols-outlined text-sm align-middle mr-2">download</span>
						Export PNG
					</button>				<button v-if="colors.length > 0" @click="sharePalette"
					class="mt-2 w-full py-3 border border-[#484848]/30 text-xs font-bold uppercase tracking-[0.2em] text-[#acabaa] hover:bg-[#e7e5e4] hover:text-[#0e0e0e] transition-colors rounded-sm">
					<span class="material-symbols-outlined text-sm align-middle mr-2">share</span>
					Share Palette
				</button>				</div>
			</section>

			<!-- Archives: Recent Palettes -->
			<section v-if="paletteHistory.length > 0" class="mb-24">
				<div class="flex justify-between items-end mb-12">
					<div>
						<h3 class="text-[#e7e5e4] text-4xl font-headline font-bold tracking-tighter">Archives</h3>
						<p class="text-[#acabaa] mt-2 font-label text-sm">Your curated library of recent
							extractions.</p>
					</div>
				</div>
				<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
					<div v-for="(palette, pIndex) in paletteHistory" :key="pIndex"
						class="bg-[#131313] p-3 rounded-sm flex flex-col gap-3 group cursor-pointer hover:bg-[#1f2020] transition-colors"
						@click="loadHistoryPalette(palette)">
						<div class="flex gap-1 h-10">
							<div v-for="(color, cIndex) in palette.colors" :key="`${pIndex}-${cIndex}`"
								:style="{ backgroundColor: color }" class="flex-1 rounded-sm"></div>
						</div>
						<span class="font-label text-[10px] uppercase tracking-widest text-[#9a9a9a]">{{ palette.colors.length }} colors</span>
					</div>
				</div>
			</section>

			<Usage />

		</main>

		<!-- Notification -->
		<div v-if="notification.show"
			class="fixed bottom-6 right-6 bg-[#252626] border border-[#484848]/30 text-[#e7e5e4] py-3 px-5 rounded-sm shadow-lg flex items-center gap-3 font-label text-xs uppercase tracking-widest">
			<span class="material-symbols-outlined text-sm">{{ notification.icon }}</span>
			{{ notification.message }}
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import ColorThief from 'colorthief'
import Header from './Header.vue'
import Usage from './Usage.vue'
import { useNotification } from '../composables/useNotification.js'
import { usePaletteHistory } from '../composables/usePaletteHistory.js'
import { useColorConversion } from '../composables/useColorConversion.js'
import { useVoiceSearch } from '../composables/useVoiceSearch.js'

// State
const query = ref('')
const imageUrl = ref('')
const colors = ref([])
const cssContent = ref('')
const isUnsplashImage = ref(false)
const photographerName = ref('')
const photographerProfile = ref('')
const activeColor = ref(null)
const formatType = ref('RGB')
const paletteSize = ref(7)
const paletteLocked = ref(false)
const fileInputRef = ref(null)

const suggestions = ['nature', 'ocean', 'mountains', 'city', 'sunset', 'architecture', 'food', 'flowers', 'animals']

// Composables
const { notification, showNotification, cleanupNotification } = useNotification()
const { paletteHistory, addToHistory } = usePaletteHistory()
	const { rgbToHex, hexToRgb, rgbToHsl, getColorName } = useColorConversion()
const { listening, toggleVoiceSearch, cleanupVoice } = useVoiceSearch(
	(recognizedQuery) => {
		query.value = recognizedQuery
		fetchImage()
	},
	showNotification
)

function applyColor(color) {
	activeColor.value = activeColor.value === color ? null : color
}

// CSS generation
function generateCSS() {
	const semanticNames = ['primary', 'secondary', 'accent']
	const varName = (i) => i < semanticNames.length ? semanticNames[i] : `color-${i + 1}`
	let cssVariables
	if (formatType.value === 'RGB') {
		cssVariables = colors.value.map((c, i) => `--${varName(i)}: ${c};`).join('\n  ')
	} else if (formatType.value === 'HEX') {
		cssVariables = colors.value.map((c, i) => `--${varName(i)}: ${rgbToHex(c)};`).join('\n  ')
	} else {
		cssVariables = colors.value.map((c, i) => `--${varName(i)}: ${rgbToHsl(c)};`).join('\n  ')
	}
	cssContent.value = `:root {\n  ${cssVariables}\n}`
}



// Color extraction
function extractColors() {
	if (paletteLocked.value) return
	const img = new Image()
	img.crossOrigin = 'Anonymous'
	img.src = imageUrl.value
	img.onload = () => {
		const colorThief = new ColorThief()
		try {
			colors.value = colorThief.getPalette(img, paletteSize.value).map(
				(c) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`
			)
			if (colors.value.length > 0) addToHistory(colors.value)
			generateCSS()
		} catch (error) {
			console.error('Error extracting colors:', error)
			showNotification('Error extracting colors', 'error')
		}
	}
	// BUG-4: handle image load failure
	img.onerror = () => showNotification('Error loading image for color extraction', 'broken_image')
}

// Image fetching
async function fetchImage() {
	if (!query.value.trim()) {
		showNotification('Please enter a search term', 'warning')
		return
	}
	try {
		showNotification('Searching for images...', 'hourglass_top')
		// SEC-1: encode query to prevent URL injection
		const response = await axios.get(
			`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query.value)}&orientation=landscape&client_id=${import.meta.env.VITE_API_KEY}`
		)
		imageUrl.value = response.data.urls.regular
		photographerName.value = response.data.user.name
		photographerProfile.value = response.data.user.links.html
		isUnsplashImage.value = true
		// Trigger Unsplash download event (required by API guidelines)
		await axios.get(`https://api.unsplash.com/photos/${response.data.id}/download?client_id=${import.meta.env.VITE_API_KEY}`)
		extractColors()
		showNotification('Image loaded successfully!', 'check_circle')
	} catch (error) {
		console.error('Error fetching image:', error)
		showNotification('Error loading image', 'error')
	}
}

async function refreshImage() {
	if (query.value) await fetchImage()
}

function searchSuggestion(suggestion) {
	query.value = suggestion
	fetchImage()
}

// QOL-2: Declarative file input — uploadImage triggers the hidden <input ref="fileInputRef">
function uploadImage() {
	fileInputRef.value?.click()
}

function handleFileChange(event) {
	const file = event.target.files[0]
	if (!file) return
	showNotification('Loading your image...', 'hourglass_top')
	const reader = new FileReader()
	reader.onload = (e) => {
		imageUrl.value = e.target.result
		isUnsplashImage.value = false
		extractColors()
		showNotification('Image loaded successfully!', 'check_circle')
	}
	reader.onerror = () => showNotification('Error processing image', 'error')
	reader.readAsDataURL(file)
	event.target.value = '' // reset so the same file can be re-selected
}

// Palette controls
function changePaletteSize(size) {
	if (paletteSize.value !== size) {
		paletteSize.value = size
		if (imageUrl.value) extractColors()
	}
}

function setFormat(fmt) {
	formatType.value = fmt
	generateCSS()
}

function toggleLockPalette() {
	paletteLocked.value = !paletteLocked.value
	showNotification(
		paletteLocked.value ? 'Palette locked' : 'Palette unlocked',
		paletteLocked.value ? 'lock' : 'lock_open'
	)
}

function copyColor(color) {
	navigator.clipboard.writeText(rgbToHex(color))
		.then(() => showNotification('Color copied!', 'content_copy'))
		.catch(() => showNotification('Failed to copy', 'error'))
}

function loadHistoryPalette(palette) {
	if (palette?.colors) {
		colors.value = [...palette.colors]
		generateCSS()
		showNotification('Historical palette loaded', 'history')
	}
}

// Export to PNG
async function exportToPNG() {
	if (colors.value.length === 0) return
	try {
		showNotification('Generating PNG...', 'hourglass_top')
		const canvas = document.createElement('canvas')
		const context = canvas.getContext('2d')
		const size = 100
		const padding = 20
		const titleHeight = 60
		canvas.width = size * colors.value.length + padding * 2
		canvas.height = size + padding * 2 + titleHeight

		context.fillStyle = '#FFFFFF'
		context.fillRect(0, 0, canvas.width, canvas.height)
		context.fillStyle = '#333333'
		context.font = 'bold 24px Inter, Arial, sans-serif'
		context.textAlign = 'center'
		context.textBaseline = 'middle'
		context.fillText('Color Palette', canvas.width / 2, titleHeight / 2)

		colors.value.forEach((color, index) => {
			const x = index * size + padding
			const y = padding + titleHeight
			context.fillStyle = color
			context.fillRect(x, y, size, size)
			const hexValue = rgbToHex(color)
			// BUG-3: guard against null return from hexToRgb
			const rgb = hexToRgb(hexValue)
			const brightness = rgb ? (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 : 0
			context.fillStyle = brightness > 125 ? '#000000' : '#FFFFFF'
			context.font = '14px Inter, Arial, sans-serif'
			context.textAlign = 'center'
			context.textBaseline = 'middle'
			context.fillText(hexValue, x + size / 2, y + size / 2)
		})

		const link = document.createElement('a')
		link.href = canvas.toDataURL('image/png')
		link.download = `color-palette-${Date.now()}.png`
		link.click()
		showNotification('PNG saved successfully!', 'check_circle')
	} catch (error) {
		console.error('Error exporting to PNG:', error)
		showNotification('Error saving PNG', 'error')
	}
}

// Share palette via URL hash
function sharePalette() {
	const hexColors = colors.value.map(c => rgbToHex(c).slice(1)).join(',')
	let hash = 'palette=' + hexColors
	if (imageUrl.value && imageUrl.value.startsWith('https://')) {
		hash += '&img=' + encodeURIComponent(imageUrl.value)
	}
	window.location.hash = hash
	navigator.clipboard.writeText(window.location.href)
		.then(() => showNotification('Share link copied!', 'share'))
		.catch(() => showNotification('Failed to copy link', 'error'))
}

// Clipboard
function copyCSSToClipboard() {
	navigator.clipboard.writeText(cssContent.value)
		.then(() => showNotification('CSS copied to clipboard!', 'content_paste'))
		.catch(() => showNotification('Failed to copy CSS', 'error'))
}

// Lifecycle
onMounted(() => {
	const hash = window.location.hash.slice(1)
	if (hash.startsWith('palette=')) {
		const params = new URLSearchParams(hash)
		const paletteParam = params.get('palette')
		const imgParam = params.get('img')
		if (paletteParam) {
			colors.value = paletteParam.split(',')
				.filter(h => /^[0-9a-f]{6}$/i.test(h))
				.map(h => `rgb(${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)})`)
			if (colors.value.length > 0) generateCSS()
		}
		if (imgParam) imageUrl.value = imgParam
	} else {
		query.value = suggestions[Math.floor(Math.random() * suggestions.length)]
		fetchImage()
	}
})

// BUG-5: clean up timers and voice listeners on unmount
onBeforeUnmount(() => {
	cleanupNotification()
	cleanupVoice()
})
</script>

<style scoped>
.glass-panel {
	background: rgba(44, 44, 44, 0.8);
	backdrop-filter: blur(20px);
}
</style>

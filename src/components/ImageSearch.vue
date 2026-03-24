<template>
	<div class="container mx-auto mt-10 max-w-[1200px]">
		<Header />

		<!-- QOL-2: declarative hidden file input driven by uploadImage() -->
		<input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="handleFileChange" />

		<!-- Main Content Section -->
		<div class="border bg-white/80 border-gray-100 rounded-xl shadow-xl p-6 m-4 md:p-8 md:m-8 backdrop-blur-sm">
			<!-- Search Input Section -->
			<div class="max-w-3xl mx-auto mb-8">
				<div class="flex flex-col gap-4">
					<div class="relative flex items-center">
						<input v-model="query" type="text"
							placeholder="Search for an image (e.g., mountains, ocean, forest...)"
							class="border border-gray-200 p-3 pl-10 rounded-xl shadow-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
							@keydown.enter="fetchImage" />
						<i class="fas fa-search absolute left-3 text-gray-400"></i>

						<div class="flex gap-2 ml-2">
							<button @click="fetchImage"
								class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
								<span class="hidden md:inline">Search</span>
								<i class="fas fa-search md:hidden"></i>
							</button>
							<button @click="toggleVoiceSearch"
								class="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white p-3 rounded-xl transition-all flex items-center justify-center w-12 shadow-md hover:shadow-lg"
								:class="{ 'animate-pulse': listening }">
								<i :class="listening ? 'fas fa-microphone-slash' : 'fas fa-microphone'"></i>
							</button>
							<button @click="uploadImage"
								class="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white p-3 rounded-xl transition-all flex items-center justify-center w-12 shadow-md hover:shadow-lg">
								<i class="fas fa-upload"></i>
							</button>
						</div>
					</div>

					<div class="flex flex-wrap gap-2 justify-center">
						<button v-for="suggestion in suggestions" :key="suggestion" @click="searchSuggestion(suggestion)"
							class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors">
							{{ suggestion }}
						</button>
					</div>
				</div>
			</div>

			<!-- Image and Palette Section -->
			<div v-if="imageUrl" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<!-- Image Card -->
				<div class="card-height bg-white/40 rounded-xl shadow-lg p-4 transition-all hover:shadow-xl">
					<div class="relative overflow-hidden rounded-lg">
						<img :src="imageUrl" alt="Generated image for color palette"
							class="w-full rounded-lg shadow-inner object-cover transform hover:scale-[1.02] transition-transform duration-300" />

						<div class="absolute top-3 right-3">
							<button @click="refreshImage"
								class="bg-white/80 hover:bg-white p-2 rounded-full text-gray-700 shadow-md backdrop-blur-sm transition-all">
								<i class="fas fa-sync-alt"></i>
							</button>
						</div>
					</div>

					<p v-if="isUnsplashImage" class="mt-3 text-sm text-gray-600 flex items-center">
						<i class="fas fa-camera mr-1"></i> Photo by
						<a :href="`${photographerProfile}?utm_source=image_color_palette_generator&utm_medium=referral&utm_campaign=api-credit`"
							target="_blank" class="text-blue-600 hover:underline mx-1">
							{{ photographerName }}
						</a>
						on
						<a href="https://unsplash.com?utm_source=image_color_palette_generator&utm_medium=referral&utm_campaign=api-credit"
							target="_blank" class="text-blue-600 hover:underline ml-1">
							Unsplash
						</a>
					</p>
				</div>

				<!-- Palette and Options Card -->
				<div
					class="bg-white/40 rounded-xl shadow-lg p-4 flex flex-col justify-between transition-all hover:shadow-xl">
					<div class="flex flex-col">
						<div class="mb-4">
							<h3 class="text-lg font-semibold mb-2 flex items-center">
								<i class="fas fa-code mr-2 text-gray-500"></i> Generated CSS
							</h3>
							<div
								class="relative p-4 bg-gray-900 shadow-inner rounded-md overflow-auto max-h-[200px] text-sm">
								<pre><code ref="cssCodeRef" class="language-css">{{ cssContent }}</code></pre>
								<button @click="copyCSSToClipboard"
									class="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-md transition-colors shadow-sm">
									<i class="far fa-copy mr-1"></i> Copy CSS
								</button>
							</div>
						</div>

						<div class="mb-4">
							<h3 class="text-lg font-semibold mb-2 flex items-center">
								<i class="fas fa-palette mr-2 text-gray-500"></i> Color Palette
								<span v-if="activeColor" class="ml-2 text-sm font-normal text-gray-500">
									{{ activeColor }}
								</span>
							</h3>
							<div ref="paletteContainer" v-if="colors.length > 0"
								class="mt-2 flex flex-wrap justify-center gap-2">
								<div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }"
									class="w-10 h-10 lg:w-10 lg:h-10 cursor-pointer rounded-full shadow-md transform hover:scale-110 transition-all border-2 border-white/50"
									:class="{ 'ring-4 ring-blue-400': activeColor === color }"
									@click="applyColor(color)">
									<div
										class="tooltip opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2 absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
										{{ rgbToHex(color) }}
									</div>
								</div>
							</div>
						</div>

						<div class="flex justify-between items-center mt-4">
							<div class="flex gap-2">
								<button v-for="size in [5, 7, 9]" :key="size" @click="changePaletteSize(size)"
									class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
									:class="{ 'bg-gray-200': paletteSize === size }">
									{{ size }}
								</button>
							</div>

							<div class="flex items-center gap-2">
								<button @click="toggleLockPalette"
									class="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
									:class="{ 'text-yellow-500': paletteLocked }">
									<i :class="paletteLocked ? 'fas fa-lock' : 'fas fa-lock-open'"></i>
								</button>
								<button @click="toggleFormatType"
									class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors flex items-center gap-1 text-sm">
									<i class="fas fa-code mr-1"></i>
									{{ formatType }}
								</button>
								<button @click="exportToPNG"
									class="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center shadow-sm hover:shadow-md">
									<i class="fas fa-download mr-2"></i> Save PNG
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Placeholder Sections (for loading state) -->
			<div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div class="aspect-video bg-gray-200 animate-pulse rounded-xl"></div>
				<div class="flex flex-col gap-6">
					<div class="h-[200px] bg-gray-200 shadow-inner rounded-xl animate-pulse"></div>
					<div class="mt-2 flex justify-center gap-2">
						<div v-for="i in 7" :key="i"
							class="w-14 h-14 lg:w-16 lg:h-16 bg-gray-200 rounded-full animate-pulse"></div>
					</div>
					<div class="flex justify-end mt-5">
						<div class="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
					</div>
				</div>
			</div>

			<!-- Color History Section -->
			<div v-if="paletteHistory.length > 0" class="mt-8 bg-white/40 p-4 rounded-xl shadow-md">
				<h3 class="text-lg font-semibold mb-3 flex items-center">
					<i class="fas fa-history mr-2"></i> Recent Palettes
				</h3>
				<div class="flex flex-nowrap overflow-x-auto pb-4 gap-6">
					<div v-for="(palette, pIndex) in paletteHistory" :key="pIndex"
						class="flex-shrink-0 p-2 bg-white/70 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
						@click="loadHistoryPalette(palette)">
						<div class="flex gap-1">
							<div v-for="(color, cIndex) in palette.colors" :key="`${pIndex}-${cIndex}`"
								:style="{ backgroundColor: color }" class="w-8 h-8 rounded-full border border-white/50">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Usage />

		<!-- Notification -->
		<div v-if="notification.show"
			class="fixed bottom-6 right-6 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 transition-opacity animate-fade-in-up">
			<i :class="notification.icon"></i>
			{{ notification.message }}
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import axios from 'axios'
import ColorThief from 'colorthief'
import Prism from 'prismjs'
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
const paletteContainer = ref(null)
const cssCodeRef = ref(null)
const fileInputRef = ref(null)

const suggestions = ['nature', 'ocean', 'mountains', 'city', 'sunset', 'architecture', 'food', 'flowers', 'animals']

// Composables
const { notification, showNotification, cleanupNotification } = useNotification()
const { paletteHistory, addToHistory } = usePaletteHistory()
const { rgbToHex, hexToRgb, rgbToHsl } = useColorConversion()
const { listening, toggleVoiceSearch, cleanupVoice } = useVoiceSearch(
	(recognizedQuery) => {
		query.value = recognizedQuery
		fetchImage()
	},
	showNotification
)

// Background theming via CSS custom properties (QOL-3)
function applyPaletteTheme() {
	if (colors.value.length >= 2) {
		const toRgba = (rgb, a) => rgb.replace('rgb(', 'rgba(').replace(')', `, ${a})`)
		const bg1 = toRgba(colors.value[0], 0.08)
		const bg2 = toRgba(colors.value[1], 0.08)
		document.documentElement.style.setProperty('--palette-bg', `linear-gradient(135deg, ${bg1}, ${bg2})`)
		document.documentElement.style.removeProperty('--palette-solid')
	}
}

function applyColor(color) {
	activeColor.value = activeColor.value === color ? null : color
	if (activeColor.value) {
		document.documentElement.style.setProperty('--palette-solid', color)
		document.documentElement.style.setProperty('--palette-bg', 'none')
	} else {
		document.documentElement.style.removeProperty('--palette-solid')
		applyPaletteTheme()
	}
}

// CSS generation
function generateCSS() {
	let cssVariables
	if (formatType.value === 'RGB') {
		cssVariables = colors.value.map((c, i) => `--color-${i + 1}: ${c};`).join('\n  ')
	} else if (formatType.value === 'HEX') {
		cssVariables = colors.value.map((c, i) => `--color-${i + 1}: ${rgbToHex(c)};`).join('\n  ')
	} else {
		cssVariables = colors.value.map((c, i) => `--color-${i + 1}: ${rgbToHsl(c)};`).join('\n  ')
	}
	cssContent.value = `:root {\n  ${cssVariables}\n}`
}

// QOL-4: Target the specific code element instead of highlightAll
async function highlightCSS() {
	await nextTick()
	if (cssCodeRef.value) Prism.highlightElement(cssCodeRef.value)
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
			applyPaletteTheme()
			highlightCSS()
		} catch (error) {
			console.error('Error extracting colors:', error)
			showNotification('Error extracting colors', 'fas fa-exclamation-circle')
		}
	}
	// BUG-4: handle image load failure
	img.onerror = () => showNotification('Error loading image for color extraction', 'fas fa-times-circle')
}

// Image fetching
async function fetchImage() {
	if (!query.value.trim()) {
		showNotification('Please enter a search term', 'fas fa-exclamation-circle')
		return
	}
	try {
		showNotification('Searching for images...', 'fas fa-spinner fa-spin')
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
		showNotification('Image loaded successfully!', 'fas fa-check-circle')
	} catch (error) {
		console.error('Error fetching image:', error)
		showNotification('Error loading image', 'fas fa-times-circle')
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
	showNotification('Loading your image...', 'fas fa-spinner fa-spin')
	const reader = new FileReader()
	reader.onload = (e) => {
		imageUrl.value = e.target.result
		isUnsplashImage.value = false
		extractColors()
		showNotification('Image loaded successfully!', 'fas fa-check-circle')
	}
	reader.onerror = () => showNotification('Error processing image', 'fas fa-times-circle')
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

function toggleFormatType() {
	const formats = ['RGB', 'HEX', 'HSL']
	formatType.value = formats[(formats.indexOf(formatType.value) + 1) % formats.length]
	generateCSS()
	highlightCSS()
}

function toggleLockPalette() {
	paletteLocked.value = !paletteLocked.value
	showNotification(
		paletteLocked.value ? 'Palette locked' : 'Palette unlocked',
		paletteLocked.value ? 'fas fa-lock' : 'fas fa-lock-open'
	)
}

function loadHistoryPalette(palette) {
	if (palette?.colors) {
		colors.value = [...palette.colors]
		generateCSS()
		highlightCSS()
		showNotification('Historical palette loaded', 'fas fa-history')
	}
}

// Export to PNG
async function exportToPNG() {
	if (!paletteContainer.value) return
	try {
		showNotification('Generating PNG...', 'fas fa-spinner fa-spin')
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
		showNotification('PNG saved successfully!', 'fas fa-check-circle')
	} catch (error) {
		console.error('Error exporting to PNG:', error)
		showNotification('Error saving PNG', 'fas fa-times-circle')
	}
}

// Clipboard
function copyCSSToClipboard() {
	navigator.clipboard.writeText(cssContent.value)
		.then(() => showNotification('CSS copied to clipboard!', 'fas fa-clipboard-check'))
		.catch(() => showNotification('Failed to copy CSS', 'fas fa-times-circle'))
}

// Lifecycle
onMounted(() => {
	query.value = suggestions[Math.floor(Math.random() * suggestions.length)]
	fetchImage()
})

// BUG-5: clean up timers and voice listeners on unmount
onBeforeUnmount(() => {
	cleanupNotification()
	cleanupVoice()
	document.documentElement.style.removeProperty('--palette-bg')
	document.documentElement.style.removeProperty('--palette-solid')
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300..800&display=swap');

div {
	font-family: 'Inter', system-ui, sans-serif;
}

/* Prism.js styling */
code[class*=language-],
pre[class*=language-] {
	color: #ccc;
	background: transparent;
	font-family: 'JetBrains Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	font-size: 0.9em;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;
	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;
	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

pre[class*=language-] {
	padding: 1em;
	margin: .5em 0;
	overflow: auto;
	border-radius: 0.375rem;
}

:not(pre)>code[class*=language-],
pre[class*=language-] {
	background: #1f2937;
}

:not(pre)>code[class*=language-] {
	padding: .1em;
	border-radius: .3em;
	white-space: normal;
}

.token.block-comment,
.token.cdata,
.token.comment,
.token.doctype,
.token.prolog {
	color: #999;
}

.token.punctuation {
	color: #ccc;
}

.token.attr-name,
.token.deleted,
.token.namespace,
.token.tag {
	color: #e2777a;
}

.token.function-name {
	color: #6196cc;
}

.token.boolean,
.token.function,
.token.number {
	color: #f08d49;
}

.token.class-name,
.token.constant,
.token.property,
.token.symbol {
	color: #f8c555;
}

.token.atrule,
.token.builtin,
.token.important,
.token.keyword,
.token.selector {
	color: #cc99cd;
}

.token.attr-value,
.token.char,
.token.regex,
.token.string,
.token.variable {
	color: #7ec699;
}

.token.entity,
.token.operator,
.token.url {
	color: #67cdcc;
}

.token.bold,
.token.important {
	font-weight: 700;
}

.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}

.token.inserted {
	color: green;
}

.text-blue-600:hover {
	text-decoration: underline;
}

.card-height {
	min-height: 200px;
}

@media (min-width: 1024px) {
	.card-height {
		min-height: 400px;
	}
}

.animate-pulse {
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

	0%,
	100% {
		opacity: 1;
	}

	50% {
		opacity: .5;
	}
}
</style>

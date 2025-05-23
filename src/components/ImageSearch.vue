<template>
	<div class="container mx-auto mt-10 max-w-[1200px]">
		<Header />

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
						<button v-for="suggestion in suggestions" @click="searchSuggestion(suggestion)"
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
								<pre><code class="language-css">{{ cssContent }}</code></pre>
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
								<button @click="changePaletteSize(5)"
									class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
									:class="{ 'bg-gray-200': paletteSize === 5 }">
									5
								</button>
								<button @click="changePaletteSize(7)"
									class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
									:class="{ 'bg-gray-200': paletteSize === 7 }">
									7
								</button>
								<button @click="changePaletteSize(9)"
									class="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
									:class="{ 'bg-gray-200': paletteSize === 9 }">
									9
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

<script>
import axios from 'axios';
import ColorThief from 'colorthief';
import Prism from 'prismjs';
import annyang from 'annyang';
import Header from './Header.vue';
import Usage from './Usage.vue';

export default {
	data() {
		return {
			query: "",
			imageUrl: "",
			colors: [],
			paletteHistory: [],
			cssContent: "",
			listening: false,
			isUnsplashImage: false,
			photographerName: "",
			photographerProfile: "",
			activeColor: null,
			formatType: "RGB",
			paletteSize: 7,
			paletteLocked: false,
			notification: {
				show: false,
				message: "",
				icon: "",
				timeout: null
			},
			suggestions: [
				"nature", "ocean", "mountains", "city", "sunset",
				"architecture", "food", "flowers", "animals", "abstract"
			]
		};
	},
	methods: {
		async fetchImage() {
			if (!this.query || this.query.trim() === "") {
				this.showNotification("Please enter a search term", "fas fa-exclamation-circle");
				return;
			}

			try {
				this.showNotification("Searching for images...", "fas fa-spinner fa-spin");

				const response = await axios.get(
					`https://api.unsplash.com/photos/random?query=${this.query}&orientation=landscape&client_id=${import.meta.env.VITE_API_KEY}`
				);

				this.imageUrl = response.data.urls.regular;
				this.photographerName = response.data.user.name;
				this.photographerProfile = response.data.user.links.html;
				this.isUnsplashImage = true;

				// Trigger the download event
				await axios.get(`https://api.unsplash.com/photos/${response.data.id}/download?client_id=${import.meta.env.VITE_API_KEY}`);

				this.extractColors();
				this.showNotification("Image loaded successfully!", "fas fa-check-circle");
			}
			catch (error) {
				console.error("Error fetching image:", error);
				this.showNotification("Error loading image", "fas fa-times-circle");
			}
		},

		async refreshImage() {
			if (this.query) {
				await this.fetchImage();
			}
		},

		async uploadImage() {
			const input = document.createElement("input");
			input.type = "file";
			input.accept = "image/*";
			input.onchange = async (event) => {
				const file = event.target.files[0];
				if (file) {
					try {
						this.showNotification("Loading your image...", "fas fa-spinner fa-spin");

						const reader = new FileReader();
						reader.onload = async (event) => {
							this.imageUrl = event.target.result;
							this.isUnsplashImage = false;
							this.extractColors();
							this.showNotification("Image loaded successfully!", "fas fa-check-circle");
						};
						reader.readAsDataURL(file);
					} catch (error) {
						console.error("Error processing uploaded image:", error);
						this.showNotification("Error processing image", "fas fa-times-circle");
					}
				}
			};
			input.click();
		},

		searchSuggestion(suggestion) {
			this.query = suggestion;
			this.fetchImage();
		},

		extractColors() {
			if (this.paletteLocked) return;

			const img = new Image();
			img.crossOrigin = "Anonymous";
			img.src = this.imageUrl;
			img.onload = () => {
				const colorThief = new ColorThief();
				try {
					this.colors = colorThief.getPalette(img, this.paletteSize).map((color) =>
						`rgb(${color[0]}, ${color[1]}, ${color[2]})`
					);

					// Save to palette history
					if (this.colors.length > 0) {
						this.paletteHistory.unshift({
							colors: [...this.colors],
							timestamp: new Date().getTime()
						});

						// Keep only the last 10 palettes
						if (this.paletteHistory.length > 10) {
							this.paletteHistory = this.paletteHistory.slice(0, 10);
						}
					}

					this.generateCSS();
					Prism.highlightAll();
				}
				catch (error) {
					console.error("Error extracting colors:", error);
					this.showNotification("Error extracting colors", "fas fa-palette fa-times-circle");
				}
			};
		},

		generateCSS() {
			let cssVariables;

			if (this.formatType === "RGB") {
				cssVariables = this.colors.map((color, index) =>
					`--color-${index + 1}: ${color};`
				).join("\n  ");
			} else if (this.formatType === "HEX") {
				cssVariables = this.colors.map((color, index) =>
					`--color-${index + 1}: ${this.rgbToHex(color)};`
				).join("\n  ");
			} else if (this.formatType === "HSL") {
				cssVariables = this.colors.map((color, index) =>
					`--color-${index + 1}: ${this.rgbToHsl(color)};`
				).join("\n  ");
			}

			this.cssContent = `:root {\n  ${cssVariables}\n}`;
		},

		applyColor(color) {
			this.activeColor = this.activeColor === color ? null : color;

			if (this.activeColor) {
				document.body.style.backgroundColor = color;
				document.body.style.backgroundImage = "none";
			} else {
				document.body.style.backgroundColor = "";
				document.body.style.backgroundImage = "";
			}
		},

		changePaletteSize(size) {
			if (this.paletteSize !== size) {
				this.paletteSize = size;
				if (this.imageUrl) {
					this.extractColors();
				}
			}
		},

		toggleFormatType() {
			const formats = ["RGB", "HEX", "HSL"];
			const currentIndex = formats.indexOf(this.formatType);
			const nextIndex = (currentIndex + 1) % formats.length;
			this.formatType = formats[nextIndex];
			this.generateCSS();
			Prism.highlightAll();
		},

		toggleLockPalette() {
			this.paletteLocked = !this.paletteLocked;
			this.showNotification(
				this.paletteLocked ? "Palette locked" : "Palette unlocked",
				this.paletteLocked ? "fas fa-lock" : "fas fa-lock-open"
			);
		},

		loadHistoryPalette(palette) {
			if (palette && palette.colors) {
				this.colors = [...palette.colors];
				this.generateCSS();
				Prism.highlightAll();
				this.showNotification("Historical palette loaded", "fas fa-history");
			}
		},

		async exportToPNG() {
			const paletteContainer = this.$refs.paletteContainer;
			if (!paletteContainer) {
				console.error("Palette container is not found");
				return;
			}

			try {
				this.showNotification("Generating PNG...", "fas fa-spinner fa-spin");

				const canvas = document.createElement("canvas");
				const context = canvas.getContext("2d");
				const size = 100; // Size of each color square
				const padding = 20; // Padding around the colors
				const titleHeight = 60; // Height for the title section

				canvas.width = size * this.colors.length + padding * 2;
				canvas.height = size + padding * 2 + titleHeight;

				// Fill the background
				context.fillStyle = "#FFFFFF";
				context.fillRect(0, 0, canvas.width, canvas.height);

				// Add a title
				context.fillStyle = "#333333";
				context.font = "bold 24px Inter, Arial, sans-serif";
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.fillText("Color Palette", canvas.width / 2, titleHeight / 2);

				// Draw each color square
				this.colors.forEach((color, index) => {
					const x = index * size + padding;
					const y = padding + titleHeight;

					// Draw the color square
					context.fillStyle = color;
					context.fillRect(x, y, size, size);

					// Draw the color value
					const hexValue = this.rgbToHex(color);

					// Determine text color based on background brightness
					const rgb = this.hexToRgb(hexValue);
					const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
					context.fillStyle = brightness > 125 ? "#000000" : "#FFFFFF";

					context.font = "14px Inter, Arial, sans-serif";
					context.textAlign = "center";
					context.textBaseline = "middle";
					context.fillText(hexValue, x + size / 2, y + size / 2);
				});

				const link = document.createElement("a");
				link.href = canvas.toDataURL("image/png");
				link.download = `color-palette-${new Date().getTime()}.png`;
				link.click();

				this.showNotification("PNG saved successfully!", "fas fa-check-circle");
			}
			catch (error) {
				console.error("Error exporting to PNG:", error);
				this.showNotification("Error saving PNG", "fas fa-times-circle");
			}
		},

		rgbToHex(rgb) {
			const result = rgb.match(/\d+/g).map((num) => {
				const hex = parseInt(num).toString(16);
				return hex.length === 1 ? "0" + hex : hex;
			});
			return `#${result.join("")}`;
		},

		hexToRgb(hex) {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
		},

		rgbToHsl(rgb) {
			// Parse the RGB values
			const values = rgb.match(/\d+/g).map(Number);
			let r = values[0] / 255;
			let g = values[1] / 255;
			let b = values[2] / 255;

			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			let h, s, l = (max + min) / 2;

			if (max === min) {
				h = s = 0; // achromatic
			} else {
				const d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

				switch (max) {
					case r: h = (g - b) / d + (g < b ? 6 : 0); break;
					case g: h = (b - r) / d + 2; break;
					case b: h = (r - g) / d + 4; break;
				}

				h /= 6;
			}

			h = Math.round(h * 360);
			s = Math.round(s * 100);
			l = Math.round(l * 100);

			return `hsl(${h}, ${s}%, ${l}%)`;
		},

		startVoiceSearch() {
			if (annyang) {
				const commands = {
					"*query": (query) => {
						console.log("Voice recognized:", query);
						this.query = query;
						this.fetchImage();
					},
				};

				annyang.addCommands(commands);
				annyang.start({ autoRestart: true, continuous: false });

				annyang.addCallback('start', () => {
					this.showNotification("Listening...", "fas fa-microphone");
				});

				annyang.addCallback('end', () => {
					this.listening = false;
				});

				annyang.addCallback('error', (err) => {
					console.error("Voice recognition error:", err);
					this.showNotification("Voice recognition error", "fas fa-exclamation-circle");
					this.listening = false;
				});

				annyang.addCallback('result', (phrases) => {
					if (phrases && phrases.length > 0) {
						this.showNotification(`Recognized: "${phrases[0]}"`, "fas fa-check-circle");
					}
				});
			}
		},

		toggleVoiceSearch() {
			if (annyang) {
				if (this.listening) {
					annyang.abort();
					this.listening = false;
					this.showNotification("Voice search stopped", "fas fa-microphone-slash");
				} else {
					this.startVoiceSearch();
					this.listening = true;
				}
			} else {
				this.showNotification("Voice recognition not supported in this browser", "fas fa-exclamation-circle");
				console.error("Annyang is not supported in this browser");
			}
		},

		copyCSSToClipboard() {
			navigator.clipboard.writeText(this.cssContent).then(() => {
				this.showNotification("CSS copied to clipboard!", "fas fa-clipboard-check");
			}).catch((error) => {
				console.error("Error copying CSS to clipboard:", error);
				this.showNotification("Failed to copy CSS", "fas fa-times-circle");
			});
		},

		showNotification(message, icon) {
			// Clear any existing timeout
			if (this.notification.timeout) {
				clearTimeout(this.notification.timeout);
			}

			// Show the new notification
			this.notification.show = true;
			this.notification.message = message;
			this.notification.icon = icon;

			// Set a timeout to hide the notification
			this.notification.timeout = setTimeout(() => {
				this.notification.show = false;
			}, 3000);
		}
	},
	components: {
		Header,
		Usage
	},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300..800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

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

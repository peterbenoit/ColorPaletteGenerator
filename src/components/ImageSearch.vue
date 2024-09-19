<template>
	<div class="container mx-auto mt-10 max-w-[1200px] border bg-white border-gray-100 rounded-lg shadow-lg p-8">
		<div class="grid grid-cols-2 gap-4">
			<h1 class="flex items-center text-3xl font-bold mb-2">
				Image Color Palette Generator
				<a class="ml-2" href="https://github.com/peterbenoit/ColorPaletteGenerator" style="display: inline;">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="14" height="14">
						<path
							d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
					</svg></a>
			</h1>
			<div class="flex flex-col mb-4 text-end">
				<div class="flex">
					<input v-model="query" type="text" placeholder="Search for an image..."
						class="border border-gray-100 p-2 rounded-md shadow-sm w-full" @keydown.enter="fetchImage" />
					<button @click="fetchImage" class="ml-2 bg-blue-500 text-white p-2 rounded-md">
						Search
					</button>
				</div>
			</div>
		</div>
		<div v-if="imageUrl" class="grid grid-cols-2 gap-4">
			<div class="min-h-[400px] rounded-md">
				<div v-if="imageUrl">
					<img :src="imageUrl" alt="An Image" class="w-full rounded-lg shadow-lg" />
					<p class="mt-2 text-sm text-gray-600">
						Photo by
						<a :href="photographerProfile" target="_blank" class="text-blue-600">
							{{ photographerName }}
						</a>
						on
						<a href="https://unsplash.com" target="_blank" class="text-blue-600">
							Unsplash
						</a>
					</p>
				</div>
			</div>

			<div class="flex justify-between flex-col">
				<div class="flex flex-col">
					<div class="p-4 bg-gray-100 shadow-inner rounded-md mb-4 overflow-auto">
						<pre><code class="language-css">{{ cssContent }}</code></pre>
					</div>
					<!--

				<div class="p-4 bg-gray-100 shadow-inner rounded-md mb-4 h-40 overflow-auto">
					<pre>
      <code class="language-css">
        <span>:root {</span>
        <br />
        <span
          v-for="(color, index) in colors"
          :key="index"
          class="flex items-center"
        >
          <span class="ml-4">
            --color-{{ index + 1 }}:
          </span>
          <span
            :style="{ backgroundColor: color }"
            class="inline-block w-4 h-4 ml-2 mr-2 rounded-sm"
          ></span>
          <span>{{ color }};</span>
        </span>
        <br />
        <span>}</span>
      </code>
    </pre>
				</div> -->

					<div ref="paletteContainer" v-if="colors.length > 0" class="mt-6 flex justify-center space-x-4">
						<div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }"
							class="w-16 h-16 rounded-full cursor-pointer border border-black"
							@click="applyColor(color)">
						</div>
					</div>
				</div>
				<div class="flex justify-end mt-5">
					<button @click="exportToPNG" class="bg-green-500 text-white p-2 rounded-md">Save PNG</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import ColorThief from 'colorthief';
import html2canvas from 'html2canvas';
import Prism from 'prismjs';

export default {
	data() {
		return {
			query: '',
			imageUrl: '',
			colors: [],
			paletteHistory: [],
			cssContent: '',
		};
	},
	methods: {
		async fetchImage() {
			try {
				const response = await axios.get(
					`https://api.unsplash.com/photos/random?query=${this.query}&client_id=${import.meta.env.VITE_API_KEY}`
				);

				this.imageUrl = response.data.urls.regular;
				this.photographerName = response.data.user.name;
				this.photographerProfile = response.data.user.links.html;

				// Trigger the download event
				await axios.get(
					`https://api.unsplash.com/photos/${response.data.id}/download?client_id=${import.meta.env.VITE_API_KEY}`
				);

				this.extractColors();
			} catch (error) {
				console.error('Error fetching image:', error);
			}
		},
		extractColors() {
			const img = new Image();
			img.crossOrigin = 'Anonymous';
			img.src = this.imageUrl;

			img.onload = () => {
				const colorThief = new ColorThief();
				try {
					this.colors = colorThief.getPalette(img, 7).map(
						(color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
					);
					this.generateCSS();
					Prism.highlightAll();
				} catch (error) {
					console.error('Error extracting colors:', error);
				}
			};
		},
		generateCSS() {
			const cssVariables = this.colors.map(
				(color, index) => `--color-${index + 1}: ${color};`
			).join('\n');
			this.cssContent = `:root {\n${cssVariables}\n}`;
		},
		applyColor(color) {
			document.body.style.backgroundColor = color;
		},
		async exportToPNG() {
			const paletteContainer = this.$refs.paletteContainer;

			if (!paletteContainer) {
				console.error('Palette container is not found');
				return;
			}

			try {
				// Convert the referenced container to PNG
				const canvas = await html2canvas(paletteContainer);
				const link = document.createElement('a');
				link.href = canvas.toDataURL('image/png');
				link.download = 'color-palette.png';
				link.click();
			} catch (error) {
				console.error('Error exporting to PNG:', error);
			}
		},
	},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Moderustic:wght@300..800&display=swap');

div {
	font-family: 'Moderustic', sans-serif;
}

code[class*=language-],
pre[class*=language-] {
	color: #ccc;
	background: 0 0;
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	font-size: 1em;
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
	hyphens: none
}

pre[class*=language-] {
	padding: 1em;
	margin: .5em 0;
	overflow: auto
}

:not(pre)>code[class*=language-],
pre[class*=language-] {
	background: #2d2d2d
}

:not(pre)>code[class*=language-] {
	padding: .1em;
	border-radius: .3em;
	white-space: normal
}

.token.block-comment,
.token.cdata,
.token.comment,
.token.doctype,
.token.prolog {
	color: #999
}

.token.punctuation {
	color: #ccc
}

.token.attr-name,
.token.deleted,
.token.namespace,
.token.tag {
	color: #e2777a
}

.token.function-name {
	color: #6196cc
}

.token.boolean,
.token.function,
.token.number {
	color: #f08d49
}

.token.class-name,
.token.constant,
.token.property,
.token.symbol {
	color: #f8c555
}

.token.atrule,
.token.builtin,
.token.important,
.token.keyword,
.token.selector {
	color: #cc99cd
}

.token.attr-value,
.token.char,
.token.regex,
.token.string,
.token.variable {
	color: #7ec699
}

.token.entity,
.token.operator,
.token.url {
	color: #67cdcc
}

.token.bold,
.token.important {
	font-weight: 700
}

.token.italic {
	font-style: italic
}

.token.entity {
	cursor: help
}

.token.inserted {
	color: green
}
.text-blue-600:hover {
	text-decoration: underline;
}
</style>

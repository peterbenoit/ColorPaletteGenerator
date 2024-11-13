<template>
  <div class="container mx-auto mt-10 max-w-[1200px]">
    <h1 class="text-4xl font-bold mb-2 text-center">
      🎨 Image Color Palette Generator
      <a class="ml-2 text-sm" href="https://github.com/peterbenoit/ColorPaletteGenerator">
        <i class="fa-brands fa-github"></i>
      </a>
    </h1>
    <p class="my-6 text-sm max-w-[1000px] mx-auto">
      The Image Color Palette Generator allows you to generate a color palette from a random image based on your search query using the <a href="https://unsplash.com" target="_blank" class="text-blue-600">Unsplash API</a> 📸.
      Either enter a keyword, click "Search", or you can also use voice search powered by the <a href="https://www.talater.com/annyang/" target="_blank" class="text-blue-600">annyang Voice API</a> 🎤.
      Once the palette is generated, you can copy the CSS or save the color palette as a PNG. 🖼️
    </p>
    <div class="border bg-white/50 border-gray-100 rounded-lg shadow-lg p-8">
      <div class="grid grid-cols-2 gap-4">
		<div></div>
        <div class="flex flex-col mb-4 text-end">
          <div class="flex">
            <input v-model="query" type="text" placeholder="Search for an image..."
              class="border border-gray-100 p-2 rounded-md shadow-sm w-full" @keydown.enter="fetchImage" />
            <button @click="fetchImage" class="ml-2 bg-blue-500 text-white p-2 rounded-md">Search</button>
            <button @click="toggleVoiceSearch" class="ml-2 bg-green-500 text-white p-2 rounded-md w-[50px]">
              <i :class="listening ? 'fas fa-microphone-slash' : 'fas fa-microphone'"></i>
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
            <div class="relative p-4 bg-gray-100 shadow-inner rounded-md mb-4 overflow-auto">
              <pre><code class="language-css">{{ cssContent }}</code></pre>
              <button @click="copyCSSToClipboard" class="absolute top-[26px] right-[18px] bg-[#ccc] text-black p-1 rounded-md">Copy CSS</button>
            </div>

            <div ref="paletteContainer" v-if="colors.length > 0" class="mt-6 flex justify-center space-x-4">
              <div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }"
                class="w-16 h-16 cursor-pointer border border-black rounded-full"
                @click="applyColor(color)">
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-5">
            <button @click="exportToPNG" class="bg-green-500 text-white p-2 rounded-md">Save PNG</button>
          </div>
        </div>
      </div>

      <!-- Placeholder sections -->
      <div v-else class="grid grid-cols-2 gap-4">
        <div class="min-h-[400px] rounded-md bg-gray-200 animate-pulse"></div>
        <div class="flex justify-between flex-col">
          <div class="flex flex-col">
            <div class="min-h-[200px] p-4 bg-gray-200 shadow-inner rounded-md mb-4 overflow-auto animate-pulse"></div>
            <div class="mt-6 flex justify-center space-x-4">
              <div class="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div class="flex justify-end mt-5">
            <button class="bg-gray-200 text-white p-2 rounded-md animate-pulse">Save PNG</button>
          </div>
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
import annyang from 'annyang';

export default {
  data() {
    return {
      query: '',
      imageUrl: '',
      colors: [],
      paletteHistory: [],
      cssContent: '',
	  listening: false,
    };
  },
  methods: {
    async fetchImage() {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/random?query=${this.query}&orientation=landscape&client_id=${import.meta.env.VITE_API_KEY}`
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
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const size = 100; // Size of each color square

        canvas.width = size * this.colors.length;
        canvas.height = size;

        this.colors.forEach((color, index) => {
          const x = index * size;
          const y = 0;

          // Draw the color square
          context.fillStyle = color;
          context.fillRect(x, y, size, size);

          // Draw the HEX value centered
          context.fillStyle = '#000';
          context.font = '16px Arial';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(this.rgbToHex(color), x + size / 2, y + size / 2);
        });

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'color-palette.png';
        link.click();
      } catch (error) {
        console.error('Error exporting to PNG:', error);
      }
    },
    rgbToHex(rgb) {
      const result = rgb.match(/\d+/g).map((num) => {
        const hex = parseInt(num).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      });
      return `#${result.join('')}`;
    },
	startVoiceSearch() {
	if (annyang) {
		const commands = {
		'*query': (query) => {
			console.log('Voice recognized:', query);
			this.query = query;
			this.fetchImage();
		},
		};
		annyang.addCommands(commands);
		annyang.start({ autoRestart: true, continuous: true });
	}
	},
	toggleVoiceSearch() {
	if (annyang) {
		if (this.listening) {
		annyang.abort();
		} else {
		this.startVoiceSearch();
		}
		this.listening = !this.listening;
	} else {
		console.error('Annyang is not supported in this browser');
	}
	},
	copyCSSToClipboard() {
      navigator.clipboard.writeText(this.cssContent).then(() => {
        console.log('CSS copied to clipboard');
      }).catch((error) => {
        console.error('Error copying CSS to clipboard:', error);
      });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Moderustic:wght@300..800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

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
  hyphens: none;
}

pre[class*=language-] {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
}

:not(pre)>code[class*=language-],
pre[class*=language-] {
  background: #2d2d2d;
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

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>

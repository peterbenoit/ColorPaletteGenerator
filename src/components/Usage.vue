<template>
	<div class="container mx-auto p-4 m-4 md:m-8 md:p-8">
		<div class="flex items-center justify-center mb-6">
			<h2
				class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 relative">
				How to Use
				<div
					class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left">
				</div>
			</h2>
		</div>

		<div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
			<!-- Step 1 -->
			<div
				class="flex flex-col items-start p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
				<div class="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 to-indigo-500"></div>
				<div class="flex items-center space-x-2 mb-3">
					<div
						class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-md">
						1</div>
					<span
						class="ml-2 inline-flex items-center text-3xl text-blue-500 group-hover:text-blue-600 transition-colors">
						<i class="fas fa-search animate-pulse"></i>
					</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">Find Your
					Perfect Image</h3>
				<p class="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors">
					Search Unsplash with keywords or explore our suggested themes. Try the
					<span
						class="inline-flex items-center text-green-600 font-semibold px-2 py-1 bg-green-50 rounded-md"><i
							class="fas fa-microphone mr-1"></i>Voice Search</span> feature or <span
						class="inline-flex items-center text-purple-600 font-semibold px-2 py-1 bg-purple-50 rounded-md"><i
							class="fas fa-upload mr-1"></i>Upload</span> your own inspiration.
				</p>
			</div>

			<!-- Step 2 -->
			<div
				class="flex flex-col items-start p-6 rounded-xl shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
				<div class="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-400 to-amber-500"></div>
				<div class="flex items-center space-x-2 mb-3">
					<div
						class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 text-white font-bold text-lg shadow-md">
						2</div>
					<span
						class="ml-2 inline-flex items-center text-3xl text-yellow-500 group-hover:text-yellow-600 transition-colors">
						<i class="fas fa-palette"></i>
					</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">Discover
					Your Color Story</h3>
				<p class="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors">
					Watch as AI extracts the perfect palette from your chosen image. Click any color to preview it as a
					background,
					and see real-time color values in HEX, RGB, and HSL formats.
				</p>
			</div>

			<!-- Step 3 -->
			<div
				class="flex flex-col items-start p-6 rounded-xl shadow-lg bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
				<div class="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-400 to-teal-500"></div>
				<div class="flex items-center space-x-2 mb-3">
					<div
						class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 text-white font-bold text-lg shadow-md">
						3</div>
					<span
						class="ml-2 inline-flex items-center text-3xl text-green-500 group-hover:text-green-600 transition-colors">
						<i class="fas fa-code"></i>
					</span>
				</div>
				<h3 class="text-xl font-semibold text-gray-800 group-hover:text-teal-700 transition-colors">Export &
					Create</h3>
				<p class="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors">
					With one click, copy ready-to-use CSS variables with the
					<span
						class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-md whitespace-nowrap shadow-sm">Copy
						CSS</span>
					button or download your palette as a
					<span
						class="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-md whitespace-nowrap shadow-sm">PNG
						Image</span>.
				</p>
			</div>
		</div>

		<!-- New Pro Tips Section -->
		<div
			class="mt-10 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 shadow-lg">
			<h3 class="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
				<i class="fas fa-lightbulb mr-2 text-yellow-400"></i> Pro Tips
			</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex items-start p-3">
					<div class="text-purple-500 mr-3 mt-1"><i class="fas fa-magic"></i></div>
					<p class="text-gray-700">Try searching for abstract concepts like "serenity" or "energy" to discover
						unexpected color combinations.</p>
				</div>
				<div class="flex items-start p-3">
					<div class="text-purple-500 mr-3 mt-1"><i class="fas fa-swatchbook"></i></div>
					<p class="text-gray-700">For web design, look for images with high contrast between elements to
						create accessible color schemes.</p>
				</div>
				<div class="flex items-start p-3">
					<div class="text-purple-500 mr-3 mt-1"><i class="fas fa-paint-brush"></i></div>
					<p class="text-gray-700">Upload photos of nature, architecture, or art that inspire you for truly
						unique palettes.</p>
				</div>
				<div class="flex items-start p-3">
					<div class="text-purple-500 mr-3 mt-1"><i class="fas fa-tint"></i></div>
					<p class="text-gray-700">Create a collection of palettes for different project moods by saving
						multiple PNG exports.</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Usage',
	data() {
		return {
			isVisible: false
		}
	},
	mounted() {
		// Add intersection observer to animate in elements when they come into view
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					this.isVisible = true;
					entry.target.classList.add('fade-in-up');
				}
			});
		}, {
			threshold: 0.1
		});

		// Observe the container element
		const container = this.$el.querySelector('.container');
		if (container) {
			observer.observe(container);
		}
	}
}
</script>

<style scoped>
.fade-in-up {
	animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Animated gradient border effect */
.group:hover .absolute.bottom-0 {
	transform: scaleX(1);
}

/* Subtle hover effects for the pro tips */
.flex.items-start {
	transition: all 0.3s ease;
}

.flex.items-start:hover {
	background-color: rgba(255, 255, 255, 0.7);
	border-radius: 0.5rem;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	transform: translateX(5px);
}

/* Animated icons */
.fa-palette,
.fa-code,
.fa-lightbulb {
	transition: transform 0.5s ease;
}

.group:hover .fa-palette {
	animation: spin 2s ease infinite;
}

.group:hover .fa-code {
	animation: pulse 2s ease infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	25% {
		transform: rotate(15deg);
	}

	50% {
		transform: rotate(0deg);
	}

	75% {
		transform: rotate(-15deg);
	}

	100% {
		transform: rotate(0deg);
	}
}

@keyframes pulse {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.2);
	}

	100% {
		transform: scale(1);
	}
}
</style>

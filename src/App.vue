<template>
	<div class="app-container">
		<ImageSearch />
		<footer class="mt-12 py-6 text-center border-t border-gray-100 bg-white/60 backdrop-blur-sm">
			<div class="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
				<div class="mb-4 md:mb-0">
					<p class="text-gray-600">
						© {{ new Date().getFullYear() }} Color Palette Generator | Built with ❤️ by <a
							href="https://www.uiguy.dev" target="_blank"
							class="text-gray-400 hover:text-blue-600 transition-colors">Peter
							Benoit</a>
					</p>
				</div>
				<div class="flex space-x-4">
					<a href="https://github.com/peterbenoit/ColorPaletteGenerator" target="_blank"
						class="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
						<i class="fab fa-github text-xl mr-2"></i> GitHub
					</a>
					<a href="#" @click.prevent="showCredits = true"
						class="text-gray-600 hover:text-purple-600 transition-colors flex items-center">
						<i class="fas fa-info-circle text-xl mr-2"></i> About
					</a>
				</div>
			</div>
		</footer>

		<!-- Credits Modal -->
		<transition name="fade">
			<div v-if="showCredits"
				class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
				@click="showCredits = false">
				<div class="bg-white rounded-2xl p-6 max-w-lg mx-4 shadow-2xl" @click.stop>
					<div class="flex justify-between items-center mb-4">
						<h3
							class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
							About This Tool</h3>
						<button @click="showCredits = false" class="text-gray-500 hover:text-gray-700 text-xl">
							<i class="fas fa-times"></i>
						</button>
					</div>
					<div class="prose prose-sm">
						<p>
							The Color Palette Generator is an open-source tool that helps designers and developers
							extract color palettes from images.
						</p>
						<p>
							Built with Vue.js and TailwindCSS, it leverages the ColorThief library to analyze images and
							extract dominant colors.
						</p>
						<h4 class="text-lg font-medium mb-2 mt-4">Credits</h4>
						<ul class="list-disc pl-5">
							<li>Images provided by <a href="https://unsplash.com" target="_blank"
									class="text-blue-600 hover:underline">Unsplash</a></li>
							<li>Color extraction powered by <a href="https://lokeshdhakar.com/projects/color-thief/"
									target="_blank" class="text-blue-600 hover:underline">Color Thief</a></li>
							<li>Voice recognition using <a href="https://www.talater.com/annyang/" target="_blank"
									class="text-blue-600 hover:underline">Annyang</a></li>
						</ul>
					</div>
					<div class="mt-6 flex justify-end">
						<button @click="showCredits = false"
							class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow">Close</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import ImageSearch from './components/ImageSearch.vue';

export default {
	name: 'App',
	components: {
		ImageSearch,
	},
	data() {
		return {
			showCredits: false
		}
	}
};
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';

.app-container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	position: relative;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

footer {
	margin-top: auto;
}

/* Add smooth scrolling for the whole page */
html {
	scroll-behavior: smooth;
}

/* Import moved to the top of the style section */

/* Modal transitions */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: scale(0.95);
}

/* Floating animation for subtle movement */
@keyframes float {
	0% {
		transform: translateY(0px);
	}

	50% {
		transform: translateY(-5px);
	}

	100% {
		transform: translateY(0px);
	}
}

/* Add subtle animation to links */
a {
	position: relative;
	transition: all 0.3s ease;
}

a:hover {
	text-decoration: none;
}

a:after {
	content: '';
	position: absolute;
	width: 0;
	height: 2px;
	bottom: -2px;
	left: 0;
	background: linear-gradient(to right, #3B82F6, #8B5CF6);
	transition: width 0.3s ease;
}

a:hover:after {
	width: 100%;
}

h1 {
	line-height: 2.6 !important;
}

/* Add subtle hover effect to buttons */
button {
	transition: all 0.3s ease;
}

button:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Enhanced scrollbar */
::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

::-webkit-scrollbar-track {
	background: rgba(241, 245, 249, 0.8);
}

::-webkit-scrollbar-thumb {
	background: linear-gradient(to bottom, #3B82F6, #8B5CF6);
	border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
	background: linear-gradient(to bottom, #2563EB, #7C3AED);
}
</style>

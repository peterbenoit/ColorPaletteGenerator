<template>
	<div class="app-container">
		<ImageSearch />

		<!-- Footer -->
		<footer class="border-t border-[#484848]/15 py-12">
			<div
				class="flex flex-col md:flex-row justify-between items-center px-8 w-full gap-8 max-w-screen-2xl mx-auto">
				<div class="font-label text-[10px] uppercase tracking-widest text-[#acabaa]">
					© {{ new Date().getFullYear() }} <a href="https://www.peterbenoit.com" target="_blank"
						class="font-label text-[10px] uppercase tracking-widest text-[#acabaa] hover:text-[#c7c6c5] transition-colors">Peter
						Benoit</a>
				</div>
				<div class="flex gap-8">
					<a href="https://github.com/peterbenoit/ColorPaletteGenerator" target="_blank"
						class="font-label text-[10px] uppercase tracking-widest text-[#acabaa] hover:text-[#c7c6c5] transition-colors">GitHub</a>
					<a href="#" @click.prevent="showCredits = true"
						class="font-label text-[10px] uppercase tracking-widest text-[#acabaa] hover:text-[#c7c6c5] transition-colors">About</a>
				</div>
			</div>
		</footer>

		<!-- Credits Modal -->
		<transition name="fade">
			<div v-if="showCredits"
				class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
				@click="showCredits = false">
				<div class="bg-[#1f2020] border border-[#484848]/30 rounded-sm p-8 max-w-lg mx-4 shadow-2xl"
					@click.stop>
					<div class="flex justify-between items-center mb-6">
						<h3 class="text-[#e7e5e4] text-2xl font-headline font-bold tracking-tight">About</h3>
						<button @click="showCredits = false"
							class="text-[#acabaa] hover:text-[#f9f9f9] transition-colors">
							<span class="material-symbols-outlined">close</span>
						</button>
					</div>
					<div class="space-y-4 text-sm text-[#acabaa] leading-relaxed">
						<p>Drop in an image, get a color palette. Export CSS variables, HEX, or RGB instantly.</p>
						<p>Built with Vue.js and TailwindCSS, it leverages the ColorThief library to analyze images and
							extract dominant colors with precision.</p>
						<h4 class="font-label text-xs uppercase tracking-widest text-[#9a9a9a] mt-6">Credits</h4>
						<ul class="space-y-2 mt-2">
							<li>Images provided by <a href="https://unsplash.com" target="_blank"
									class="text-[#c7c6c5] hover:underline">Unsplash</a></li>
							<li>Color extraction powered by <a href="https://lokeshdhakar.com/projects/color-thief/"
									target="_blank" class="text-[#c7c6c5] hover:underline">Color Thief</a></li>
							<li>Voice recognition using <a href="https://www.talater.com/annyang/" target="_blank"
									class="text-[#c7c6c5] hover:underline">Annyang</a></li>
						</ul>
					</div>
					<div class="mt-8 flex justify-end">
						<button @click="showCredits = false"
							class="bg-gray-50 text-[#3f403f] px-6 py-2 rounded-sm text-sm font-bold tracking-tight hover:brightness-110 transition-all">Close</button>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, provide } from 'vue'
import ImageSearch from './components/ImageSearch.vue'

const showCredits = ref(false)
provide('openCredits', () => { showCredits.value = true })
</script>

<style>
.app-container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	position: relative;
}

footer {
	margin-top: auto;
}

html {
	scroll-behavior: smooth;
}

/* Modal transitions */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: scale(0.97);
}
</style>

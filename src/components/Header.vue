<template>
	<!-- Top Navigation Shell -->
	<header class="bg-[#0e0e0e]/80 backdrop-blur-xl top-0 sticky z-50">
		<nav class="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-screen-2xl mx-auto">
			<a href="/" class="text-md tracking-widest text-[#f9f9f9] font-headline uppercase flex items-center gap-2 hover:opacity-80 transition-opacity">
				<img src="/favicon-32x32.png" alt="Visual Chromatics" class="w-8 h-8" />
				<span class="md:hidden">Visual Chromatics</span>
			</a>
			<div class="hidden md:flex gap-10 items-center">
				<a class="font-headline tracking-tight font-medium text-sm text-[#f9f9f9] border-b-2 border-[#c7c6c5] pb-1 hover:text-[#f9f9f9] transition-colors duration-300"
					href="#">Generator</a>
				<a href="https://github.com/peterbenoit/ColorPaletteGenerator" target="_blank"
					class="font-headline tracking-tight font-medium text-sm text-[#acabaa] hover:text-[#f9f9f9] transition-colors duration-300">GitHub</a>
				<a href="#" @click.prevent="openCredits"
					class="font-headline tracking-tight font-medium text-sm text-[#acabaa] hover:text-[#f9f9f9] transition-colors duration-300">About</a>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { inject } from 'vue'
const openCredits = inject('openCredits', () => {})
</script>


<template>
	<!-- Top Navigation Shell -->
	<header class="bg-[#0e0e0e]/80 backdrop-blur-xl top-0 sticky z-50">
		<nav class="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
			<div class="text-xl font-black tracking-tighter text-[#f9f9f9] font-headline uppercase">
				<svg width="24px" height="24px" stroke-width="1.5"
					viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
					<path d="M1 21L4.14286 3H19.8571L23 21H1Z" stroke="#ffffff" stroke-width="1.5"
						stroke-linecap="round" stroke-linejoin="round"></path>
					<path d="M2 16.5H22" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path d="M3 12H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path d="M4 7.5H20" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path d="M12 3V21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path d="M8 3.5L6.5 20.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path d="M16 3.5L17.5 20.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
						stroke-linejoin="round"></path>
				</svg>
			</div>
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


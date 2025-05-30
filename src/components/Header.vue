<template>
	<div class="container mx-auto p-4 m-4 md:m-8 md:p-8">
		<!-- Header Section -->
		<div class="text-center mb-8">
			<div class="flex items-center justify-center mb-4">
				<div class="logo-animation mr-3">
					<svg width="48" height="48" viewBox="0 0 128 128" class="logo-svg">
						<circle cx="64" cy="38" r="16" class="circle-1" />
						<circle cx="38" cy="77" r="16" class="circle-2" />
						<circle cx="90" cy="77" r="16" class="circle-3" />
						<circle cx="64" cy="64" r="16" class="circle-4" fill="white" />
						<path
							d="M58 62C60.2091 62 62 60.2091 62 58C62 55.7909 60.2091 54 58 54C55.7909 54 54 55.7909 54 58C54 60.2091 55.7909 62 58 62Z"
							fill="#EF4444" class="mini-circle" />
						<path
							d="M69 59C71.2091 59 73 57.2091 73 55C73 52.7909 71.2091 51 69 51C66.7909 51 65 52.7909 65 55C65 57.2091 66.7909 59 69 59Z"
							fill="#F59E0B" class="mini-circle" />
						<path
							d="M73 70C75.2091 70 77 68.2091 77 66C77 63.7909 75.2091 62 73 62C70.7909 62 69 63.7909 69 66C69 68.2091 70.7909 70 73 70Z"
							fill="#10B981" class="mini-circle" />
						<path
							d="M62 77C64.2091 77 66 75.2091 66 73C66 70.7909 64.2091 69 62 69C59.7909 69 58 70.7909 58 73C58 75.2091 59.7909 77 62 77Z"
							fill="#3B82F6" class="mini-circle" />
						<path
							d="M54 66C56.2091 66 58 64.2091 58 62C58 59.7909 56.2091 58 54 58C51.7909 58 50 59.7909 50 62C50 64.2091 51.7909 66 54 66Z"
							fill="#8B5CF6" class="mini-circle" />
					</svg>
				</div>
				<h1
					class="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-[2.6]">
					Image Color Palette Generator
				</h1>
			</div>
			<p class="text-gray-700 mt-2 max-w-3xl mx-auto text-lg">
				Generate beautiful color palettes from images with ease. Whether you're a designer, developer, or just
				looking for inspiration, this tool lets you create color palettes directly from images using the
				<a href="https://unsplash.com" target="_blank" class="text-blue-600">Unsplash API</a>.
				Search by keyword, use voice search, or upload an image to start.
			</p>
			<div class="flex flex-wrap justify-center gap-3 mt-4">
				<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Color
					Extraction</span>
				<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Voice Search</span>
				<span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">CSS
					Generation</span>
				<span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Image
					Upload</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.logo-animation {
	position: relative;
	animation: float 6s ease-in-out infinite;
}

.logo-svg {
	filter: drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.1));
}

.circle-1 {
	fill: #EF4444;
}

.circle-2 {
	fill: #F59E0B;
}

.circle-3 {
	fill: #10B981;
}

.circle-4 {
	fill: #3B82F6;
}

@keyframes float {

	0%,
	100% {
		transform: translateY(0);
	}

	50% {
		transform: translateY(-10px);
	}
}

.mini-circle {
	transform-origin: center;
	animation: pulse 3s infinite alternate;
}

@keyframes pulse {
	from {
		transform: scale(1);
	}

	to {
		transform: scale(1.2);
	}
}

.mini-circle:nth-child(odd) {
	animation-delay: 1.5s;
}
</style>

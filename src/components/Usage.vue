<template>
	<div class="container mx-auto p-4 m-4 md:m-8 md:p-8">
		<h2 class="text-2xl font-semibold">How to Use</h2>
		<div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

			<!-- Step 1 -->
			<div class="flex flex-col items-start p-4 border rounded-lg shadow-sm bg-blue-50">
				<div class="flex items-center space-x-2">
					<div class="text-lg font-bold">Step 1</div>
					<span class="ml-2 inline-flex items-center text-2xl">
						<i class="fas fa-search"></i>
					</span>
				</div>
				<h3 class="mt-2 font-semibold text-gray-800">Search or Upload an Image</h3>
				<p class="text-gray-600 mt-1">
					Enter a keyword and click "Search" to find an image from Unsplash. Use the
					<span class="inline-flex items-center text-green-600 font-semibold"><i
							class="fas fa-microphone mr-1"></i>Voice Search</span> or <span
						class="inline-flex items-center text-green-600 font-semibold"><i
							class="fas fa-upload mr-1"></i>Upload</span> your own image.
				</p>
			</div>

			<!-- Step 2 -->
			<div class="flex flex-col items-start p-4 border rounded-lg shadow-sm bg-blue-50">
				<div class="flex items-center space-x-2">
					<div class="text-lg font-bold">Step 2</div>
					<span class="ml-2 inline-flex items-center text-yellow-600 text-2xl">
						<i class="fas fa-palette"></i>
					</span>
				</div>
				<h3 class="mt-2 font-semibold text-gray-800">Review Your Color Palette</h3>
				<p class="text-gray-600 mt-1">
					Once the image loads, a palette of dominant colors will display. Click any color circle to preview
					it as a background color.
				</p>
			</div>

			<!-- Step 3 -->
			<div class="flex flex-col items-start p-4 border rounded-lg shadow-sm bg-blue-50">
				<div class="flex items-center space-x-2">
					<div class="text-lg font-bold">Step 3</div>
					<span class="ml-2 inline-flex items-center text-gray-600 text-2xl">
						<i class="fas fa-copy"></i>
					</span>
				</div>
				<h3 class="mt-2 font-semibold text-gray-800">Save or Copy CSS</h3>
				<p class="text-gray-600 mt-1">
					Click the <span class="bg-gray-200 px-2 py-1 rounded-md">Copy CSS</span> button to copy color
					variables to your clipboard or the <span
						class="bg-green-500 text-white px-2 py-1 rounded-md whitespace-nowrap">Save
						PNG</span> button to download the palette as a PNG.
				</p>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	name: 'Usage'
}
</script>

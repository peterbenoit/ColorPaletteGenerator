<template>
	<section class="grid grid-cols-1 md:grid-cols-2 gap-24 mt-10">
		<div>
			<h4 class="text-2xl font-headline font-bold mb-10 tracking-tight">The Methodology</h4>
			<div class="space-y-12">
				<div class="flex gap-6">
					<span class="font-headline text-4xl font-extralight text-[#484848]">01</span>
					<div>
						<h5 class="font-headline font-bold mb-2 text-[#e7e5e4]">Image Ingestion</h5>
						<p class="text-sm text-[#acabaa] leading-relaxed">Provide a URL search or local file. Our
							system
							uses ColorThief to identify dominant tonal clusters in the bitmap.</p>
					</div>
				</div>
				<div class="flex gap-6">
					<span class="font-headline text-4xl font-extralight text-[#484848]">02</span>
					<div>
						<h5 class="font-headline font-bold mb-2 text-[#e7e5e4]">Nuance Extraction</h5>
						<p class="text-sm text-[#acabaa] leading-relaxed">We bypass generic averaging, instead
							targeting specific visual anchors that define the image's emotional atmosphere via k-means
							clustering.</p>
					</div>
				</div>
				<div class="flex gap-6">
					<span class="font-headline text-4xl font-extralight text-[#484848]">03</span>
					<div>
						<h5 class="font-headline font-bold mb-2 text-[#e7e5e4]">Export & Deploy</h5>
						<p class="text-sm text-[#acabaa] leading-relaxed">Copy ready-to-use CSS variables directly into
							your design system, or export a PNG swatch palette for documentation and presentations.</p>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-[#1f2020] p-12 rounded-sm relative overflow-hidden">
			<div class="absolute -right-12 -bottom-12 w-48 h-48 editorial-gradient opacity-10 blur-3xl"></div>
			<h4 class="text-2xl font-headline font-bold mb-8 tracking-tight">Curator Pro Tips</h4>
			<ul class="space-y-6">
				<li class="flex items-start gap-4">
					<span class="material-symbols-outlined text-[#c7c6c5] mt-1">lightbulb</span>
					<p class="text-sm text-[#acabaa] leading-relaxed"><strong class="text-[#e7e5e4]">Contrast
							Control:</strong> Use low-exposure images for professional "Dark Mode" palettes that utilize
						deep surface tones.</p>
				</li>
				<li class="flex items-start gap-4">
					<span class="material-symbols-outlined text-[#c7c6c5] mt-1">auto_awesome</span>
					<p class="text-sm text-[#acabaa] leading-relaxed"><strong class="text-[#e7e5e4]">Variable
							Sync:</strong> Directly copy the generated CSS variables into your Design System's global
						stylesheet for instant theming.</p>
				</li>
				<li class="flex items-start gap-4">
					<span class="material-symbols-outlined text-[#c7c6c5] mt-1">mic</span>
					<p class="text-sm text-[#acabaa] leading-relaxed"><strong class="text-[#e7e5e4]">Voice
							Search:</strong> Hands-free image discovery — speak your concept and CURATOR finds it
						instantly.</p>
				</li>
				<li class="flex items-start gap-4">
					<span class="material-symbols-outlined text-[#c7c6c5] mt-1">palette</span>
					<p class="text-sm text-[#acabaa] leading-relaxed"><strong class="text-[#e7e5e4]">Lock &
							Reload:</strong> Lock a palette you love, then refresh the image to test your colors against
						new photography.</p>
				</li>
			</ul>
		</div>
	</section>
</template>





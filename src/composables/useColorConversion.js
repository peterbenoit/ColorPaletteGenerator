const COLOR_NAMES = [
	{ name: 'OBSIDIAN', r: 14, g: 14, b: 14 },
	{ name: 'CHARCOAL', r: 36, g: 36, b: 36 },
	{ name: 'IRON', r: 72, g: 72, b: 72 },
	{ name: 'ASH GRAY', r: 178, g: 176, b: 173 },
	{ name: 'BONE', r: 231, g: 229, b: 228 },
	{ name: 'IVORY', r: 255, g: 255, b: 240 },
	{ name: 'CHALK WHITE', r: 249, g: 249, b: 249 },
	{ name: 'DEEP MARINE', r: 44, g: 74, b: 82 },
	{ name: 'OCEAN SLATE', r: 52, g: 101, b: 118 },
	{ name: 'TEAL MIST', r: 80, g: 155, b: 161 },
	{ name: 'SOFT SLATE', r: 142, g: 155, b: 151 },
	{ name: 'PALE SAGE', r: 188, g: 210, b: 194 },
	{ name: 'OYSTER BONE', r: 242, g: 232, b: 207 },
	{ name: 'SAND DUNE', r: 194, g: 178, b: 142 },
	{ name: 'WARM PUTTY', r: 205, g: 189, b: 160 },
	{ name: 'DESERT TAN', r: 210, g: 180, b: 140 },
	{ name: 'RAW UMBER', r: 130, g: 102, b: 68 },
	{ name: 'DARK WALNUT', r: 78, g: 52, b: 32 },
	{ name: 'ESPRESSO', r: 40, g: 26, b: 13 },
	{ name: 'RUST', r: 183, g: 65, b: 14 },
	{ name: 'TERRACOTTA', r: 204, g: 119, b: 77 },
	{ name: 'CLAY', r: 188, g: 143, b: 109 },
	{ name: 'BLUSH', r: 222, g: 172, b: 154 },
	{ name: 'DUSTY ROSE', r: 194, g: 136, b: 134 },
	{ name: 'DEEP CRIMSON', r: 139, g: 26, b: 26 },
	{ name: 'BURGUNDY', r: 100, g: 22, b: 29 },
	{ name: 'MAUVE', r: 153, g: 102, b: 102 },
	{ name: 'WARM AMBER', r: 215, g: 153, b: 33 },
	{ name: 'GOLDEN HOUR', r: 240, g: 191, b: 79 },
	{ name: 'STRAW', r: 228, g: 217, b: 154 },
	{ name: 'MOSS', r: 90, g: 103, b: 55 },
	{ name: 'OLIVE', r: 128, g: 128, b: 0 },
	{ name: 'SAGE', r: 143, g: 151, b: 121 },
	{ name: 'FERN', r: 113, g: 145, b: 86 },
	{ name: 'FOREST', r: 34, g: 85, b: 34 },
	{ name: 'DEEP TEAL', r: 0, g: 90, b: 90 },
	{ name: 'COBALT', r: 0, g: 71, b: 171 },
	{ name: 'STEEL BLUE', r: 70, g: 130, b: 180 },
	{ name: 'SKY', r: 135, g: 206, b: 235 },
	{ name: 'ICE BLUE', r: 193, g: 232, b: 234 },
	{ name: 'LAVENDER', r: 181, g: 160, b: 211 },
	{ name: 'PLUM', r: 102, g: 51, b: 102 },
	{ name: 'VIOLET DUSK', r: 72, g: 38, b: 84 },
	{ name: 'MUTED VIOLET', r: 148, g: 114, b: 159 },
	{ name: 'DUSK PINK', r: 200, g: 150, b: 175 },
	{ name: 'POWDER PINK', r: 235, g: 195, b: 210 },
	{ name: 'STONE', r: 115, g: 110, b: 107 },
	{ name: 'WARM GRAY', r: 150, g: 144, b: 139 },
	{ name: 'COOL GRAY', r: 128, g: 134, b: 140 },
	{ name: 'SILVER FOG', r: 198, g: 198, b: 198 },
]

export function useColorConversion() {
	function rgbToHex(rgb) {
		const parts = rgb.match(/\d+/g)
		if (!parts || parts.length < 3) return '#000000'
		return '#' + parts.slice(0, 3).map((num) => {
			const hex = parseInt(num).toString(16)
			return hex.length === 1 ? '0' + hex : hex
		}).join('')
	}

	function hexToRgb(hex) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null
	}

	function rgbToHsl(rgb) {
		const parts = rgb.match(/\d+/g)
		if (!parts || parts.length < 3) return 'hsl(0, 0%, 0%)'
		let r = parseInt(parts[0]) / 255
		let g = parseInt(parts[1]) / 255
		let b = parseInt(parts[2]) / 255

		const max = Math.max(r, g, b)
		const min = Math.min(r, g, b)
		let h, s
		let l = (max + min) / 2

		if (max === min) {
			h = s = 0
		} else {
			const d = max - min
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break
				case g: h = (b - r) / d + 2; break
				case b: h = (r - g) / d + 4; break
			}
			h /= 6
		}

		return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
	}

	function getColorName(rgb) {
		const parts = rgb.match(/\d+/g)
		if (!parts || parts.length < 3) return 'UNKNOWN'
		const r = parseInt(parts[0])
		const g = parseInt(parts[1])
		const b = parseInt(parts[2])
		let closest = COLOR_NAMES[0]
		let minDist = Infinity
		for (const entry of COLOR_NAMES) {
			const dist = (r - entry.r) ** 2 + (g - entry.g) ** 2 + (b - entry.b) ** 2
			if (dist < minDist) {
				minDist = dist
				closest = entry
			}
		}
		return closest.name
	}

	return { rgbToHex, hexToRgb, rgbToHsl, getColorName }
}

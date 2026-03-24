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

	return { rgbToHex, hexToRgb, rgbToHsl }
}

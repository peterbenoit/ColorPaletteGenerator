import { ref } from 'vue'

const STORAGE_KEY = 'cpg-palette-history'

export function usePaletteHistory() {
	function loadFromStorage() {
		try {
			const stored = localStorage.getItem(STORAGE_KEY)
			return stored ? JSON.parse(stored) : []
		} catch {
			return []
		}
	}

	const paletteHistory = ref(loadFromStorage())

	function addToHistory(colors) {
		paletteHistory.value.unshift({ colors: [...colors], timestamp: Date.now() })
		if (paletteHistory.value.length > 10) {
			paletteHistory.value = paletteHistory.value.slice(0, 10)
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(paletteHistory.value))
	}

	return { paletteHistory, addToHistory }
}

import { ref } from 'vue'
import annyang from 'annyang'

export function useVoiceSearch(onRecognized, onNotification) {
	const listening = ref(false)

	function startVoiceSearch() {
		if (!annyang) return

		annyang.removeCommands()
		annyang.addCommands({
			'*query': (query) => {
				onRecognized(query)
			}
		})
		annyang.start({ autoRestart: true, continuous: false })

		annyang.addCallback('start', () => onNotification('Listening...', 'fas fa-microphone'))
		annyang.addCallback('end', () => { listening.value = false })
		annyang.addCallback('error', () => {
			onNotification('Voice recognition error', 'fas fa-exclamation-circle')
			listening.value = false
		})
		annyang.addCallback('result', (phrases) => {
			if (phrases?.length > 0) {
				onNotification(`Recognized: "${phrases[0]}"`, 'fas fa-check-circle')
			}
		})
	}

	function toggleVoiceSearch() {
		if (!annyang) {
			onNotification('Voice recognition not supported in this browser', 'fas fa-exclamation-circle')
			return
		}
		if (listening.value) {
			annyang.abort()
			listening.value = false
			onNotification('Voice search stopped', 'fas fa-microphone-slash')
		} else {
			startVoiceSearch()
			listening.value = true
		}
	}

	function cleanupVoice() {
		if (annyang && listening.value) annyang.abort()
	}

	return { listening, toggleVoiceSearch, cleanupVoice }
}

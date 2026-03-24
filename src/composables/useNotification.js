import { reactive } from 'vue'

export function useNotification() {
	const notification = reactive({ show: false, message: '', icon: '' })
	let timeout = null

	function showNotification(message, icon) {
		if (timeout) clearTimeout(timeout)
		notification.show = true
		notification.message = message
		notification.icon = icon
		timeout = setTimeout(() => { notification.show = false }, 3000)
	}

	function cleanupNotification() {
		if (timeout) clearTimeout(timeout)
	}

	return { notification, showNotification, cleanupNotification }
}

module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				'float': 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce-slow': 'bounce 3s infinite',
				'spin-slow': 'spin 3s linear infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				}
			},
			colors: {
				'primary': {
					50: '#f0f4ff',
					100: '#e0e7ff',
					200: '#c7d2fe',
					300: '#a5b4fc',
					400: '#818cf8',
					500: '#6366f1',
					600: '#4f46e5',
					700: '#4338ca',
					800: '#3730a3',
					900: '#312e81',
					950: '#1e1b4b',
				},
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
						a: {
							color: '#4f46e5',
							'&:hover': {
								color: '#4338ca',
							},
						},
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
	safelist: [
		'bg-red-500',
		'bg-yellow-500',
		'bg-green-500',
		'bg-blue-500',
		'bg-indigo-500',
		'bg-purple-500',
		'bg-pink-500',
		'text-red-500',
		'text-yellow-500',
		'text-green-500',
		'text-blue-500',
		'text-indigo-500',
		'text-purple-500',
		'text-pink-500',
	]
}

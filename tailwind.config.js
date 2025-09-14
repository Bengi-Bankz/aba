/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./apps/**/*.{js,ts,svelte}', './packages/**/*.{js,ts,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				bungeespice: ['BungeeSpice', 'sans-serif'],
				'material-symbols': ['Material Symbols Outlined', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

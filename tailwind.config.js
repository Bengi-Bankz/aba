/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./apps/**/*.{js,ts,svelte}', './packages/**/*.{js,ts,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				custom: ['DiplomataSC', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

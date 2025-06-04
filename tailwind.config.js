/** @type {import('tailwindcss').Config} */

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				black: "var(--color-black)",
				white: "var(--color-white)",
				gray100: "var(--color-gray100)",
				gray300: "var(--color-gray300)",
				gray500: "var(--color-gray500)",
				gray800: "var(--color-gray800)",
				purple: "var(--color-purple)",
				"light-purple": "var(--color-light-purple)",
			},
			fontFamily: {
				pretendard: ["var(--font-pretendard)"],
			},
		},
	},
	plugins: [],
};

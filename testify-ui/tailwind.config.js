module.exports = {
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			width: {
				"400px": "400px",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

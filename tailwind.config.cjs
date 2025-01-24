module.exports = {
	content: ["./index.html", "./app/**/*.{vue,js,ts,jsx,tsx}"],
	media: false,
	theme: {
		extend: {
			width: {
				"400px": "400px",
			},
			animation: {
				"fade-in-up": "fade-in-up 1s ease-out",
				"fade-in": "fadeIn 0.5s ease-in",
				"fade-in-up": "fadeInUp 1s ease-out",
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"cursor-blink": "blink 0.75s step-end infinite",
				"gradient-move": "gradientMove 3s ease-in-out infinite",
				"bounce-in-down": "bounceInDown 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				fadeInUp: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				blink: {
					"0%, 100%": { borderColor: "transparent" },
					"50%": { borderColor: "white" },
				},
				gradientMove: {
					"0%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
					"100%": { backgroundPosition: "0% 50%" },
				},
				bounceInDown: {
					"0%": {
						transform: "translateY(-500px)",
						opacity: "0",
					},
					"60%": {
						transform: "translateY(25px)",
						opacity: "1",
					},
					"75%": { transform: "translateY(-10px)" },
					"90%": { transform: "translateY(5px)" },
					"100%": { transform: "translateY(0)" },
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

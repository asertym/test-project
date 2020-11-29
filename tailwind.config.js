// tailwind config
const colors = require("tailwindcss/colors");
module.exports = {
	// purge: [],
	theme: {
		screens: {
			sm: "640px", // => @media (min-width: 640px) { ... }
			md: "768px", // => @media (min-width: 768px) { ... }
			lg: "1024px", // => @media (min-width: 1024px) { ... }
			xl: "1400px", // => @media (min-width: 1280px) { ... }
		},
		colors: {
			red: "#C4132F",
			gray: colors.trueGray,
		},
		fontFamily: {
			sans: "Montserrat, sans-serif",
		},
		// fontSize: {

		// },
		borderRadius: {
			default: "16px",
		},
		container: {
			center: true,
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				white: "#fff",
			},
			gap: {
				2: "15px",
			},
		},
	},
	variants: {},
	plugins: [],
};

const defaultTheme = {
	primary: "black",
	secondary: "white",
	background: "white",
	boxShadow: "#666666",
	backgroundClass: "default-background",
};

const themes = {
	kawasaki: {
		primary: "#28a745",
		secondary: "white",
		background: "#000000",
		boxShadow: "#28a745",
		backgroundClass: "kawasaki-background",
	},
	honda: {
		primary: "#7F0000",
		secondary: "white",
		background: "#000000",
		boxShadow: "#660000",
		backgroundClass: "honda-background",
	},
	yamaha: {
		primary: "#2A48A1",
		secondary: "#FFDD33",
		background: "#FFFFFF",
		boxShadow: "#1C2F70",
		backgroundClass: "yamaha-background",
	},
	ducati: {
		primary: "#c00",
		secondary: "black",
		background: "white",
		boxShadow: "#660000",
		backgroundClass: "ducati-background",
	},
	bmw: {
		primary: "#0D8DB3",
		secondary: "white",
		background: "#F2F2F2",
		boxShadow: "#095F73",
		backgroundClass: "bmw-background",
	},
	"harley-davidson": {
		primary: "#8B5A00",
		secondary: "black",
		background: "white",
		boxShadow: "#654400",
		backgroundClass: "harley-davidson-background",
	},
	suzuki: {
		primary: "#1E45A0",
		secondary: "white",
		background: "#F2F2F2",
		boxShadow: "#14327A",
		backgroundClass: "suzuki-background",
	},
	aprilia: {
		primary: "red",
		secondary: "black",
		background: "white",
		boxShadow: "#4C1010",
		backgroundClass: "aprilia-background",
	},
	triumph: {
		primary: "#101A44",
		secondary: "white",
		background: "#F2F2F2",
		boxShadow: "#0B1130",
		backgroundClass: "triumph-background",
	},
	bajaj: {
		primary: "#006ad0",
		secondary: "white",
		background: "#F2F2F2",
		boxShadow: "#002D5B",
		backgroundClass: "bajaj-background",
	},
	cleveland: {
		primary: "#92eb00",
		secondary: "white",
		background: "#F2F2F2",
		boxShadow: "#2E1443",
		backgroundClass: "cleveland-background",
	},
	"gas gas": {
		primary: "#cb0d25",
		secondary: "white",
		background: "#F2F2F2",
		boxShadow: "#4C1010",
		backgroundClass: "gasgas-background",
	},
	hero: {
		primary: "#ee2326",
		secondary: "black",
		background: "white",
		boxShadow: "#4C1010",
		backgroundClass: "hero-background",
	},
	ktm: {
		primary: "#f60",
		secondary: "black",
		background: "white",
		boxShadow: "#f60",
		backgroundClass: "ktm-background",
	},
	italjet: {
		primary: "#AA1A1A",
		secondary: "white",
		background: "black",
		boxShadow: "#4C1010",
		backgroundClass: "italjet-background",
	},
	enfield: {
		primary: "#FFA500",
		secondary: "white",
		background: "black",
		boxShadow: "#CC8400",
		backgroundClass: "enfield-background",
	},
	zero: {
		primary: "#FAF9F6",
		secondary: "black",
		background: "#661414",
		boxShadow: "black",
		backgroundClass: "zero-background",
	},
	indian: {
		primary: "#4B0000",
		secondary: "white",
		background: "#F2F2F2",
		boxShadow: "#330000",
		backgroundClass: "indian-background",
	},
};

const applyTheme = (theme) => {
	// Set CSS variables for colors
	document.documentElement.style.setProperty("--primary-color", theme.primary);
	document.documentElement.style.setProperty(
		"--secondary-color",
		theme.secondary
	);
	document.documentElement.style.setProperty(
		"--background-color",
		theme.background
	);
	document.documentElement.style.setProperty(
		"--box-shadow-color",
		theme.boxShadow
	);

	document.body.className = "";
	document.body.classList.add(theme.backgroundClass);
};

applyTheme(defaultTheme);

document.addEventListener("bike-data-changed", (event) => {
	const bike = event.detail.bike;
	if (bike && bike.make) {
		const theme = themes[bike.make.toLowerCase()] || defaultTheme;
		applyTheme(theme);
	}
});

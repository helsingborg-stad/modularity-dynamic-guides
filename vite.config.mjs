import { createViteConfig } from "vite-config-factory";

const entries = {
	"js/modularity-dynamic-guides-admin":
		"./source/js/modularity-dynamic-guides-admin.js",
	"js/modularity-dynamic-guides": "./source/js/modularity-dynamic-guides.js",
	"css/modularity-dynamic-guides-admin":
		"./source/sass/modularity-dynamic-guides-admin.scss",
	"css/modularity-dynamic-guides":
		"./source/sass/modularity-dynamic-guides.scss",
};

export default createViteConfig(entries, {
	outDir: "assets/dist",
	manifestFile: "manifest.json",
});

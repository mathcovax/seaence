import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import autoImport from "unplugin-auto-import/vite";
import autoImportComponents from "unplugin-vue-components/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import vueComplexTypes from "@vue.ts/complex-types/vite";

export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@vendors": fileURLToPath(new URL("./vendors", import.meta.url)),
		},
	},
	plugins: [
		vue(),
		tailwindcss(),
		autoImport({
			dirs: [
				"src/composables",
				"src/i18n",
				"src/domains/**/router.ts",
				"src/lib/zod/index.ts",
				"src/lib/horizon/index.ts",
				"vendors/design-system/composables/**",
				"vendors/design-system/utils",
				"src/utils",
			],
			imports: [
				"vue",
				"vue-i18n",
				"vue-router",
			],
			ignore: ["_**"],
			vueTemplate: true,
		}),
		autoImportComponents({
			dirs: ["src/components", "vendors/design-system"],
			exclude: ["vendors/design-system/components/form"],
		}),
		tsconfigPaths(),
		vueComplexTypes(),
	],
	server: {
		host: "0.0.0.0",
		port: 3000,
		allowedHosts: ["spotter"],
	},
	optimizeDeps: {
		force: true,
	},
});

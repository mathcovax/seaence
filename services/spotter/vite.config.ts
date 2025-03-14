import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import autoImport from "unplugin-auto-import/vite";
import autoImportComponents from "unplugin-vue-components/vite";
import { aliasDesignSystem, typeResolverDesignSystem } from "@lib/design-system/config";

export default defineConfig({
	plugins: [
		vue(),
		tailwindcss(),
		autoImport({
			dirs: [
				"src/composables",
				"src/i18n",
			],
			imports: [
				"vue",
				"vue-router",
				"vue-i18n",
			],
			ignore: ["_**"],
		}),
		autoImportComponents({
			dirs: ["src/components"],
			resolvers: [typeResolverDesignSystem],
		}),
	],
	resolve: {
		preserveSymlinks: true,
		alias: [aliasDesignSystem],
	},
});

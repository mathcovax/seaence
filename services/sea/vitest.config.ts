import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		include: [
			"business/**/*.test.ts",
			"interfaces/**/*.test.ts",
		],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html", "json-summary"],
			reportsDirectory: "coverage",
		},
	},
});

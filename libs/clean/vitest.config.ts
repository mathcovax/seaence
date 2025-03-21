import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		include: ["scripts/**/*.test.ts"],
		coverage: {
			provider: "istanbul",
			reporter: ["text", "json", "html", "json-summary"],
			reportsDirectory: "coverage",
		},
	},
});

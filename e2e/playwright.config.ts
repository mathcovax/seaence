import { envs } from "@envs";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: envs.CI,
	retries: envs.RETRIES,
	workers: envs.WORKER,
	reporter: [["html", { open: "never" }]],
	use: {
		headless: true,
		baseURL: envs.BASE_URL,
		trace: "on",
		screenshot: "only-on-failure",
		launchOptions: {
			executablePath: "/usr/bin/chromium-browser",
			args: ["--no-sandbox", "--disable-dev-shm-usage"],
		},
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});

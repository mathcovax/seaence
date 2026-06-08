import { createPage } from "@duplojs/playwright";
import { expect } from "playwright/test";

const searchResultTimeout = 10_000;

export const simpleSearchPage = createPage(
	"simpleSearch",
	{
		makePath: () => "/simple-search",
		getMainElement: ({ body }) => body.getByRole("searchbox", { name: "Rechercher..." }),
		getElements: ({ mainElement }) => ({
			searchInput: mainElement,
		}),
		getMethods: ({ mainElement, body }) => ({
			async openFirstResult(searchTerms: string[]) {
				const firstResultLink = body.locator("main").getByRole("link").first();

				for (const searchTerm of searchTerms) {
					await mainElement.fill(searchTerm);
					await mainElement.press("Enter");

					try {
						await expect(firstResultLink).toBeVisible({ timeout: searchResultTimeout });
						await firstResultLink.click();
						return;
					} catch {
						// Try another stable term when the search fixture has no result.
					}
				}

				throw new Error("No searchable document found from the UI.");
			},
		}),
	},
);

import { createComponentEngine } from "@playwright";

export const simpleSearchInputEngine = createComponentEngine(
	"simpleSearchInput",
	{
		getMainElement: (body) => body.getByTestId("simple-search-input-form"),
		getElements: (mainElement, body) => ({
			get inputSearch() {
				return mainElement.getByTestId("simple-search-input-form-search-input");
			},
			get triggerSelectLanguage() {
				return mainElement.locator("button[role=\"combobox\"][data-slot=\"select-trigger\"]");
			},
			get selectLanguageFrenchOption() {
				return body.getByRole("option", { name: "fr-FR" });
			},
			get selectLanguageEnglishOption() {
				return body.getByRole("option", { name: "en-US" });
			},
			get submitButton() {
				return mainElement.getByTestId("simple-search-input-form-submit-button").locator("svg").last();
			},
			get hint() {
				return mainElement.getByTestId("simple-search-input-hint");
			},
		}),
	},
);

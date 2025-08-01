import { createComponentEngine } from "@playwright";

export const editProfilFormEngine = createComponentEngine(
	"editProfilForm",
	{
		getMainElement: (body) => body.getByTestId("edit-profil-form"),
		getElements: (mainElement, body) => ({
			username: mainElement.locator("input#\\.username"),
			usernameHint: mainElement.locator("small#\\.username"),
			selectLanguage: mainElement.locator("div[data-id=\"baselayout-.language\"] > button"),
			selectLanguageFrenchOption: body.getByRole("option", { name: "fr-FR" }),
			selectLanguageEnglishOption: body.getByRole("option", { name: "en-US" }),
			submitButton: mainElement.getByTestId("edit-profil-form-submit-button"),
			get actualLanguage() {
				return this.selectLanguage.locator("span");
			},
		}),
	},
);

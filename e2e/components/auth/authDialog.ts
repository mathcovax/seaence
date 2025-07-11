import { createComponentEngine } from "@playwright";

export const authDialogEngine = createComponentEngine(
	"authDialog",
	{
		getMainElement: (body) => body.getByTestId("auth-dialog"),
		getElements: (mainElement, body) => ({
			googleSignButton: mainElement.getByTestId("auth-dialog-google-sign-button"),

			registerForm: mainElement.getByTestId("auth-dialog-register-form"),
			get registerFormUsername() {
				return this.registerForm.locator("input#\\.username");
			},
			get registerFormUsernameHint() {
				return this.registerForm.locator("small#\\.username");
			},
			get registerFormTriggerSelectLanguage() {
				return this.registerForm.locator("div[data-id=\"baselayout-.language\"] > button");
			},
			get registerFormSelectLanguageFranceOption() {
				return body.getByRole("option", { name: "fr-FR" });
			},
			get registerFormValideCGU() {
				return this.registerForm.locator("#\\.generalConditionsOfUse > button");
			},
			get registerFormSubmitButton() {
				return this.registerForm.getByTestId("auth-dialog-register-form-submit-button");
			},
		}),
	},
);

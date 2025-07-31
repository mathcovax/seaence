import { createPageEngine } from "@playwright";

export const profilPageEngine = createPageEngine(
	"profil",
	() => "/profil",
	{
		getMainElement: (body) => body.getByTestId("profil-page"),
	},
);

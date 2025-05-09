import { z } from "zod";

export const documentPage = createPage(
	"document",
	{
		path: "/document/:id",
		component: () => import("./pages/DocumentPage.vue"),
		params: {
			id: z.string(),
		},
	},
);

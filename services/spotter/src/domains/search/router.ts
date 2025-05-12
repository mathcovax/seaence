import { articleTypeSchema, bakedDocumentLanguageSchema } from "@/lib/horizon/types/bakedDocument";
import { genderFacetValueSchema, speciesFacetValueSchema } from "@/lib/horizon/types/search";
import { toArrayZodSchema } from "@/utils/toArrayZodSchema";

export const simpleSearchPage = createPage(
	"simpleSearch",
	{
		path: "/simple-search",
		component: () => import("./pages/SimpleSearchPage.vue"),
		query: {
			term: zod.string().default(""),
			language: bakedDocumentLanguageSchema.default("en-US"),
			articleType: toArrayZodSchema(articleTypeSchema).optional(),
			gender: toArrayZodSchema(genderFacetValueSchema).optional(),
			species: toArrayZodSchema(speciesFacetValueSchema).optional(),
			year: zod.tuple([zod.coerce.number(), zod.coerce.number()]).optional().catch(undefined),
		},
	},
);

export const advancedSearchPage = createPage(
	"advancedSearch",
	{
		path: "/advanced-search",
		component: () => import("./pages/AdvancedSearchPage.vue"),
		query: {
			term: zod.string().default(""),
			language: bakedDocumentLanguageSchema.default("en-US"),
		},
	},
);

export const testPage = createPage(
	"test",
	{
		path: "/test",
		component: () => import("./pages/TestPage.vue"),
	},
);

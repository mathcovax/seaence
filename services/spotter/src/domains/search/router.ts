import { articleTypeSchema, bakedDocumentLanguageSchema } from "@/lib/horizon/types/bakedDocument";
import { genderFacetValueSchema, speciesFacetValueSchema } from "@/lib/horizon/types/search";
import { toArrayZodSchema } from "@/utils/toArrayZodSchema";

const defaultPage = 1;

export const searchPageQuery = {
	language: bakedDocumentLanguageSchema.catch("en-US"),
	term: zod.string().catch(""),
	articleType: toArrayZodSchema(articleTypeSchema).optional().catch(undefined),
	gender: toArrayZodSchema(genderFacetValueSchema).optional().catch(undefined),
	species: toArrayZodSchema(speciesFacetValueSchema).optional().catch(undefined),
	year: zod.tuple([zod.coerce.number(), zod.coerce.number()]).optional().catch(undefined),
	page: zod.coerce.number().catch(defaultPage),
};

export const simpleSearchPage = createPage(
	"simpleSearch",
	{
		path: "/simple-search",
		component: () => import("./pages/SearchPage.vue"),
		query: searchPageQuery,
	},
);

export const advancedSearchPage = createPage(
	"advancedSearch",
	{
		path: "/advanced-search",
		component: () => import("./pages/SearchPage.vue"),
		query: searchPageQuery,
	},
);

import { favoriEquatioonNameObjecter } from "@business/domains/entities/favoriEquation";
import { positiveIntObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/search-favori-equations-per-page")
	.extract({
		body: zod.object({
			partialNameFavoriEquation: favoriEquatioonNameObjecter.toZodSchema(),
			page: positiveIntObjecter.toZodSchema(),
		}),
	});

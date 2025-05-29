import { documentTitleObjecter } from "@business/domains/entities/documentInFolder";
import { positiveIntObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/search-documents-in-folder-per-page")
	.extract({
		body: zod.object({
			partialTitleDocument: documentTitleObjecter.toZodSchema(),
			page: positiveIntObjecter.toZodSchema(),
		}),
	});

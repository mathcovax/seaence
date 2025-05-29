import { documentFolderTitleObjecter } from "@business/domains/entities/documentFolder";
import { positiveIntObjecter } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/search-document-folders-per-page")
	.extract({
		body: zod.object({
			partialTitleDocumentFolder: documentFolderTitleObjecter.toZodSchema(),
			page: positiveIntObjecter.toZodSchema(),
		}),
	});

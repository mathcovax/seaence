import { pedroArticleSchema } from "./pedro";
import { pubmedArticleSchema } from "./pubmed";
import { scienceDirectArticleSchema } from "./scienceDirect";

const rawDocumentInputSchema = zod.union([
	pubmedArticleSchema,
	pedroArticleSchema,
	scienceDirectArticleSchema,
]);

type RawDocumentInput = Zod.infer<typeof rawDocumentInputSchema>;

export {
	rawDocumentInputSchema,
	RawDocumentInput,
};

import { pedroArticleSchema } from "./pedro";
import { pubmedArticleSchema } from "./pubmed";
import { scienceDirectArticleSchema } from "./scienceDirect";

const grantSchema = zod.object({
	acronym: zod.string().nullable(),
	agency: zod.string(),
});

const authorSchema = zod.object({
	name: zod.string(),
	affiliation: zod.string().array().nullable(),
});

const baseInputSchema = zod.object({
	id: zod.string(),
	title: zod.string(),
	authors: authorSchema.array().nullable(),
	publicationDate: zod.string(),
	sourceUrl: zod.string().url(),
	grants: grantSchema.array().nullable(),
});

const inputSchema = zod.union([
	pubmedArticleSchema,
	pedroArticleSchema,
	scienceDirectArticleSchema,
]);

type Input = Zod.infer<typeof inputSchema>;

export {
	authorSchema,
	baseInputSchema,
	inputSchema,
	Input,
};

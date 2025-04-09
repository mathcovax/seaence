import { ZodAccelerator, zod } from "@duplojs/core";
import { attributeXMLSchema, tagXMLSchema, valueXML, type zodInfer } from "./XML";

const stringValue = valueXML(zod.string());
const numberValue = valueXML(zod.number());

const datePayload = [
	tagXMLSchema("Year", [numberValue]),
	tagXMLSchema("Month", [numberValue]),
	tagXMLSchema("Day", [numberValue]),
];

export const articlePayloadSchema = tagXMLSchema("PubmedArticleSet", [
	tagXMLSchema("PubmedArticle", [
		tagXMLSchema("MedlineCitation", [
			tagXMLSchema("PMID", [
				numberValue,
				attributeXMLSchema("Version", zod.number()),
			]),
			tagXMLSchema("DateCompleted", datePayload),
			tagXMLSchema("DateRevised", datePayload),
			tagXMLSchema("Article", [
				tagXMLSchema("Journal", [
					tagXMLSchema("ISSN", [
						stringValue,
						attributeXMLSchema("IssnType", zod.string()),
					]),
					tagXMLSchema("JournalIssue", [
						tagXMLSchema("Volume", [numberValue]),
						tagXMLSchema("Issue", [numberValue]),
						tagXMLSchema("PubDate", [
							tagXMLSchema("Year", [numberValue]),
							tagXMLSchema("Month", [stringValue]),
						]),
					]),
				]),
			]),
		]),
	]),
]);

export const articlePayloadBuildedSchema = ZodAccelerator.build(articlePayloadSchema);

export type ArticlePayload = zodInfer<typeof articlePayloadSchema>;

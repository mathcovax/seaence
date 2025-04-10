import { ZodAccelerator, zod } from "@duplojs/core";
import { attributeXMLSchema, tagXMLSchema, valueXML, type zodInfer, repeatTagXMLSchema } from "./XML";

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
			tagXMLSchema("Article", [
				tagXMLSchema("PublicationTypeList", [
					repeatTagXMLSchema("PublicationType", [
						stringValue,
						attributeXMLSchema("UI", zod.string()),
					]),
					repeatTagXMLSchema("ArticleDate", datePayload),
				]),
			]),
		]),
	]),
]);

export const articlePayloadBuildedSchema = ZodAccelerator.build(articlePayloadSchema);

export type ArticlePayload = zodInfer<typeof articlePayloadSchema>;

import { providerEnum } from "@business/domains/common/provider";
import { commonDateObjecter, createEnum, EntityHandler, flexibleDateObjecter, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { nodeSameRawDocumentIdObjecter } from "../nodeSameRawDocument";
import { articleTypeObjecter } from "@business/domains/common/articleType";

export const bakedDocumentLanguageEnum = createEnum([
	"fr-FR",
	"en-US",
]);

export const bakedDocumentLanguageObjecter = zod
	.enum(bakedDocumentLanguageEnum.toTuple())
	.createValueObjecter("bakedDocumentLanguage");

export const bakedDocumentIdObjecter = zod
	.string()
	.createValueObjecter("BakedDocumentId");

export type BakedDocumentId = GetValueObject<typeof bakedDocumentIdObjecter>;

export const bakedDocumentAbstractObjecter = zod
	.string()
	.createValueObjecter("BakedDocumentAbstract");

export type BakedDocumentAbstract = GetValueObject<typeof bakedDocumentAbstractObjecter>;

export const bakedDocumentAbstractPartObjecter = zod
	.object({
		name: zod.string(),
		content: zod.string(),
	})
	.createValueObjecter("bakedDocumentAbstractPart");

export type BakedDocumentAbstractPart = GetValueObject<typeof bakedDocumentAbstractPartObjecter>;

export const resourcesProviderEnum = createEnum([
	"DOIFoundation",
	...providerEnum.toTuple(),
]);

export const bakedDocumentRessourceObjecter = zod
	.object({
		resourcesProvider: zod.enum(resourcesProviderEnum.toTuple()),
		url: zod.string(),
	})
	.createValueObjecter("bakedDocumentRessource");

export type BakedDocumentRessource = GetValueObject<typeof bakedDocumentRessourceObjecter>;

export const bakedDocumentKeywordObjecter = zod
	.object({
		value: zod.string(),
	})
	.createValueObjecter("bakedDocumentKeyword");

export type BakedDocumentKeyword = GetValueObject<typeof bakedDocumentKeywordObjecter>;

export type BakedDocumentLanguage = GetValueObject<typeof bakedDocumentLanguageObjecter>;

export const bakedDocumentTitleObjecter = zod
	.string()
	.createValueObjecter("bakedDocumentTitle");

export const bakedDocumentAuthorObjecter = zod
	.object({
		name: zod.string(),
		affiliations: zod.string().array().nullable(),
	})
	.createValueObjecter("bakedDocumentAuthor");

export type BakedDocumentTitle = GetValueObject<typeof bakedDocumentTitleObjecter>;

export class BakedDocumentEntity extends EntityHandler.create({
	id: bakedDocumentIdObjecter,
	nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter,
	articleTypes: articleTypeObjecter.array(),
	title: bakedDocumentTitleObjecter,
	language: bakedDocumentLanguageObjecter,
	abstract: bakedDocumentAbstractObjecter.nullable(),
	authors: bakedDocumentAuthorObjecter.array(),
	abstractDetails: bakedDocumentAbstractPartObjecter.array().nullable(),
	resources: bakedDocumentRessourceObjecter.array(),
	keywords: bakedDocumentKeywordObjecter.array(),
	webPublishDate: flexibleDateObjecter.nullable(),
	journalPublishDate: flexibleDateObjecter.nullable(),
	lastUpdate: commonDateObjecter,
	lastExportOnSea: commonDateObjecter.nullable(),
}) {
	public static create(
		params: Omit<GetEntityProperties<typeof BakedDocumentEntity>, "lastUpdate" | "lastExportOnSea">,
	) {
		return new BakedDocumentEntity({
			...params,
			lastUpdate: commonDateObjecter.unsafeCreate(new Date()),
			lastExportOnSea: null,
		});
	}

	public exportToSea() {
		return this.update({
			lastExportOnSea: commonDateObjecter.unsafeCreate(new Date()),
		});
	}
}

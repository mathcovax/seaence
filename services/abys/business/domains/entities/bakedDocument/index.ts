import { providerObjecter } from "@business/domains/common/provider";
import { createEnum, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { nodeSameRawDocumentIdObjecter } from "../nodeSameRawDocument";
import { abstractSectionNameEnum } from "@business/domains/common/abtrasctSection";

export const bakedDocumentIdObjecter = zod
	.string()
	.createValueObjecter("BakedDocumentId");

export type BakedDocumentId = GetValueObject<typeof bakedDocumentIdObjecter>;

export const bakedDocumentAbstractObjecter = zod
	.string()
	.createValueObjecter("BakedDocumentAbstract");

export type BakedDocumentAbstract = GetValueObject<typeof bakedDocumentAbstractObjecter>;

export const bakedDocumentAbstractDetailsObjecter = zod
	.record(
		zod.enum(abstractSectionNameEnum.toTuple()),
		zod.object({
			value: zod.string(),
		}).passthrough().optional(),
	)
	.createValueObjecter("BakedDocumentAbstractDetails");

export type BakedDocumentAbstractDetails = GetValueObject<typeof bakedDocumentAbstractDetailsObjecter>;

export const bakedDocumentRessourcesObjecter = zod
	.record(
		providerObjecter.zodSchema,
		zod.object({
			name: zod.string(),
			url: zod.string(),
		}),
	)
	.createValueObjecter("bakedDocumentRessources");

export type BakedDocumentRessources = GetValueObject<typeof bakedDocumentRessourcesObjecter>;

export const bakedDocumentKeywordObjecter = zod
	.object({
		pound: zod.number().positive(),
		value: zod.string(),
	})
	.createValueObjecter("bakedDocumentKeyword");

export type BakedDocumentKeyword = GetValueObject<typeof bakedDocumentKeywordObjecter>;

export const bakedDocumentLanguageEnum = createEnum([
	"fr-FR",
	"en-US",
]);

export const bakedDocumentLanguageObjecter = zod
	.enum(bakedDocumentLanguageEnum.toTuple())
	.createValueObjecter("bakedDocumentLanguage");

export type BakedDocumentLanguage = GetValueObject<typeof bakedDocumentLanguageObjecter>;

export const bakedDocumentTitleObjecter = zod
	.string()
	.createValueObjecter("bakedDocumentTitle");

export type BakedDocumentTitle = GetValueObject<typeof bakedDocumentTitleObjecter>;

export class BakedDocumentEntity extends EntityHandler.create({
	id: bakedDocumentIdObjecter,
	nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter,
	title: bakedDocumentTitleObjecter,
	language: bakedDocumentLanguageObjecter,
	abstract: bakedDocumentAbstractObjecter.nullable(),
	abstractDetails: bakedDocumentAbstractDetailsObjecter.nullable(),
	resources: bakedDocumentRessourcesObjecter,
	keywords: bakedDocumentKeywordObjecter.array(),
}) {
	public static create(params: GetEntityProperties<typeof BakedDocumentEntity>) {
		return new BakedDocumentEntity(params);
	}
}

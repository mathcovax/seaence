import { providerEnum } from "@business/domains/common/provider";
import { commonDateObjecter, createEnum, EntityHandler, flexibleDateObjecter, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { type NodeSameRawDocumentId, nodeSameRawDocumentIdObjecter } from "../nodeSameRawDocument";
import { articleTypeObjecter } from "@business/domains/common/articleType";
import { type BakedDocumentLanguage, bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";
import { cookingModeObjecter } from "@business/domains/common/cookingMode";

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
		label: zod.string(),
		content: zod.string(),
	})
	.createValueObjecter("bakedDocumentAbstractPart");

export type BakedDocumentAbstractPart = GetValueObject<typeof bakedDocumentAbstractPartObjecter>;

export const resourceProviderEnum = createEnum([
	"DOIFoundation",
	...providerEnum.toTuple(),
]);

export const bakedDocumentRessourceObjecter = zod
	.object({
		resourceProvider: zod.enum(resourceProviderEnum.toTuple()),
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

export const bakedDocumentTitleObjecter = zod
	.string()
	.createValueObjecter("bakedDocumentTitle");

export type BakedDocumentTitle = GetValueObject<typeof bakedDocumentTitleObjecter>;

export const bakedDocumentAuthorObjecter = zod
	.object({
		name: zod.string(),
		affiliations: zod.string().array().nullable(),
	})
	.createValueObjecter("bakedDocumentAuthor");

export type BakedDocumentAuthor = GetValueObject<typeof bakedDocumentAuthorObjecter>;

interface CreateIdParams {
	nodeSameRawDocumentId: NodeSameRawDocumentId;
	language: BakedDocumentLanguage;
}

export class BakedDocumentEntity extends EntityHandler.create({
	id: bakedDocumentIdObjecter,
	cookingMode: cookingModeObjecter,
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
	lastIndexation: commonDateObjecter.nullable(),
}) {
	public static create(
		params: Omit<GetEntityProperties<typeof BakedDocumentEntity>, "id" | "lastUpdate" | "lastIndexation">,
	) {
		return new BakedDocumentEntity({
			...params,
			id: BakedDocumentEntity.makeId(params),
			lastUpdate: commonDateObjecter.unsafeCreate(new Date()),
			lastIndexation: null,
		});
	}

	public indexation() {
		return this.update({
			lastIndexation: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public static makeId({
		nodeSameRawDocumentId,
		language,
	}: CreateIdParams) {
		return bakedDocumentIdObjecter.unsafeCreate(
			`${nodeSameRawDocumentId.value}_${language.value}`,
		);
	}
}

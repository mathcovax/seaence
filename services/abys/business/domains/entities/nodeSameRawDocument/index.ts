import { type BakedDocumentLanguage, bakedDocumentLanguageObjecter } from "@business/domains/common/bakedDocumentLanguage";
import { type Provider, providerObjecter } from "@business/domains/common/provider";
import { type RawResourceUrl } from "@business/domains/common/rawDocument";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, urlObjecter, zod } from "@vendors/clean";

export const nodeSameRawDocumentIdObjecter = zod
	.string()
	.createValueObjecter("nodeSameRawDocumentId");

export type NodeSameRawDocumentId = GetValueObject<typeof nodeSameRawDocumentIdObjecter>;

export const rawDocumentWrapperObjecter = zod
	.record(
		providerObjecter.zodSchema,
		urlObjecter.zodSchema,
	)
	.createValueObjecter("rawDocumentWrapper");

export type RawDocumentWrapper = GetValueObject<typeof rawDocumentWrapperObjecter>;

export const lastCookingDatesObjecter = zod
	.record(
		bakedDocumentLanguageObjecter.zodSchema,
		zod.date(),
	)
	.createValueObjecter("lastCookingDates");

export class NodeSameRawDocumentEntity extends EntityHandler.create({
	id: nodeSameRawDocumentIdObjecter,
	rawDocumentWrapper: rawDocumentWrapperObjecter,
	uniqueField: uniqueFieldObjecter,
	lastCookingDates: lastCookingDatesObjecter,
	lastUpdate: commonDateObjecter,
}) {
	public static create(
		params: Omit<GetEntityProperties<typeof NodeSameRawDocumentEntity>, "lastCookingDates" | "lastUpdate">,
	) {
		return new NodeSameRawDocumentEntity({
			...params,
			lastCookingDates: lastCookingDatesObjecter.unsafeCreate({}),
			lastUpdate: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public setValueRawDocumentWrapper(provider: Provider, url: RawResourceUrl) {
		const newRawDocumentWrapper = rawDocumentWrapperObjecter.unsafeCreate({
			...this.rawDocumentWrapper.value,
			[provider.value]: url.value,
		});

		return this.update({
			rawDocumentWrapper: newRawDocumentWrapper,
			lastUpdate: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public cook(language: BakedDocumentLanguage) {
		return this.update({
			lastCookingDates: lastCookingDatesObjecter.unsafeCreate({
				...this.lastCookingDates.value,
				[language.value]: new Date(),
			}),
		});
	}
}

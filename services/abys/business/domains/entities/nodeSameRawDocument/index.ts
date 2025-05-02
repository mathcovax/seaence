import { type Provider, providerObjecter } from "@business/domains/common/provider";
import { type RawResourceUrl } from "@business/domains/common/rawDocument";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, urlObjecter, zod } from "@vendors/clean";

export const nodeSameRawDocumentIdObjecter = zod
	.string()
	.createValueObjecter("NodeSameRawDocumentId");

export type NodeSameRawDocumentId = GetValueObject<typeof nodeSameRawDocumentIdObjecter>;

export const rawDocumentWrapperObjecter = zod
	.record(
		providerObjecter.zodSchema,
		urlObjecter.zodSchema,
	)
	.createValueObjecter("rawDocumentWrapper");

export type RawDocumentWrapper = GetValueObject<typeof rawDocumentWrapperObjecter>;

export class NodeSameRawDocumentEntity extends EntityHandler.create({
	id: nodeSameRawDocumentIdObjecter,
	rawDocumentWrapper: rawDocumentWrapperObjecter,
	uniqueField: uniqueFieldObjecter,
	lastCooked: commonDateObjecter.nullable(),
	lastUpdate: commonDateObjecter,
}) {
	public static create(
		params: Omit<GetEntityProperties<typeof NodeSameRawDocumentEntity>, "lastCooked" | "lastUpdate">,
	) {
		return new NodeSameRawDocumentEntity({
			...params,
			lastCooked: null,
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

	public cook() {
		return this.update({
			lastCooked: commonDateObjecter.unsafeCreate(new Date()),
		});
	}
}

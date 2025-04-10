import { type Provider, providerObjecter } from "@business/domains/common/provider";
import { type RawResourceUrl } from "@business/domains/common/rawDocument";
import { uniqueFieldObjecter } from "@business/domains/common/uniqueField";
import { EntityHandler, type GetEntityProperties, type GetValueObject, urlObjecter, zod } from "@vendors/clean";

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
}) {
	public static create(params: GetEntityProperties<typeof NodeSameRawDocumentEntity>) {
		return new NodeSameRawDocumentEntity(params);
	}

	public setValueRawDocumentWrapper(provider: Provider, url: RawResourceUrl) {
		const newRawDocumentWrapper = rawDocumentWrapperObjecter.unsafeCreate({
			...this.rawDocumentWrapper.value,
			[provider.value]: url.value,
		});

		return this.update({
			rawDocumentWrapper: newRawDocumentWrapper,
		});
	}
}

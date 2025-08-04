import { booleanObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { providerObjecter } from "../common/provider";

export namespace ArticleReference {
	export const valueObjecter = zod
		.string()
		.createValueObjecter("ArticleReferenceValue");

	export type Value = GetValueObject<typeof valueObjecter>;
}

type ArticleReferenceEntityCreateParams = Pick<
	GetEntityProperties<typeof ArticleReferenceEntity>,
	| "provider"
	| "value"
>;

export class ArticleReferenceEntity extends EntityHandler.create({
	provider: providerObjecter,
	value: ArticleReference.valueObjecter,
	failedToSend: booleanObjecter,
}) {
	public static create(params: ArticleReferenceEntityCreateParams) {
		return new ArticleReferenceEntity({
			...params,
			failedToSend: booleanObjecter.unsafeCreate(false),
		});
	}

	public failed() {
		return this.update({
			failedToSend: booleanObjecter.unsafeCreate(true),
		});
	}
}

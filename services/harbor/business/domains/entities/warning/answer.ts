import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { UserWarningEntity } from "./base";
import { postIdObjecter } from "@business/domains/common/post";

export const answerUserWarningTypeObjecter = zod
	.literal("answer")
	.createValueObjecter("answerUserWarningType");
export type AnswerUserWarningType = GetValueObject<typeof answerUserWarningTypeObjecter>;

export const answerUserWarningAnswerIdObjecter = zod
	.string()
	.createValueObjecter("answerUserWarningAnswerId");
export type AnswerUserWarningAnswerId = GetValueObject<typeof answerUserWarningAnswerIdObjecter>;

export type InputCreateAnswerUserWarningEntity = Omit<
	GetEntityProperties<typeof AnswerUserWarningEntity>,
	"type"
>;

export class AnswerUserWarningEntity extends EntityHandler.create(
	{
		type: answerUserWarningTypeObjecter,
		answerId: answerUserWarningAnswerIdObjecter,
		postId: postIdObjecter,
	},
	UserWarningEntity,
) {
	public static create(params: InputCreateAnswerUserWarningEntity) {
		return new AnswerUserWarningEntity({
			...params,
			type: answerUserWarningTypeObjecter.unsafeCreate("answer"),
		});
	}
}

import { EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";
import { postIdObjecter } from "./post";
import { userIdObjecter } from "./user";

export const answerContentObjecter = zod.string().createValueObjecter("answerContent");
export const answerIdObjecter = zod.string().createValueObjecter("answerId");

export type AnswerContent = GetValueObject<typeof answerContentObjecter>;
export type AnswerId = GetValueObject<typeof answerIdObjecter>;

export class AnswerEntity extends EntityHandler.create({
	answerId: answerIdObjecter,
	postId: postIdObjecter,
	content: answerContentObjecter,
	responderId: userIdObjecter,
}) {
	public static create(params: GetEntityProperties<typeof AnswerEntity>) {
		return new AnswerEntity(params);
	}
}

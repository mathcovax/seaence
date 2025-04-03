import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { postIdObjecter } from "./post";
import { userObjecter } from "../common/user";

export const answerContentObjecter = zod.string().createValueObjecter("answerContent");
export const answerIdObjecter = zod.string().createValueObjecter("answerId");

export type AnswerContent = GetValueObject<typeof answerContentObjecter>;
export type AnswerId = GetValueObject<typeof answerIdObjecter>;

export class AnswerEntity extends EntityHandler.create({
	id: answerIdObjecter,
	postId: postIdObjecter,
	content: answerContentObjecter,
	author: userObjecter,
}) {
	public static create(params: GetEntityProperties<typeof AnswerEntity>) {
		return new AnswerEntity(params);
	}
}

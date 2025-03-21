import { EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";
import { postIdObjecter } from "./post";
import { userIdObjecter } from "./user";

const answerContentObjecter = zod.string().createValueObjecter("answerContent");

export type AnswerContent = GetValueObject<typeof answerContentObjecter>;

export class AnswerEntity extends EntityHandler.create({
	postId: postIdObjecter,
	content: answerContentObjecter,
	responderId: userIdObjecter,
}) {
	public static create(params: GetEntityProperties<AnswerEntity>) {
		return new AnswerEntity(params);
	}
}

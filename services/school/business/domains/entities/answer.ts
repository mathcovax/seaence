import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { postIdObjecter } from "./post";
import { userObjecter } from "../common/user";
import { dateObjecter } from "../common/date";

export const answerContentObjecter = zod.string().createValueObjecter("answerContent");
export const answerIdObjecter = zod.string().createValueObjecter("answerId");

export type AnswerContent = GetValueObject<typeof answerContentObjecter>;
export type AnswerId = GetValueObject<typeof answerIdObjecter>;

type InputCreateAnswerEntity = Omit<GetEntityProperties<typeof AnswerEntity>, "createdAt">;

export class AnswerEntity extends EntityHandler.create({
	id: answerIdObjecter,
	postId: postIdObjecter,
	content: answerContentObjecter,
	author: userObjecter,
	createdAt: dateObjecter,
}) {
	public static create(params: InputCreateAnswerEntity) {
		return new AnswerEntity({
			...params,
			createdAt: dateObjecter.unknownThrowCreate(new Date()),
		});
	}
}

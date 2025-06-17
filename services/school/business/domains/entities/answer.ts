import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { postIdObjecter } from "./post";
import { answerRules } from "@vendors/entity-rules";
import { userIdObjecter, type Username, usernameObjecter } from "../common/user";

export const answerContentObjecter = zod.string()
	.min(answerRules.content.minLength)
	.max(answerRules.content.maxLength)
	.createValueObjecter("answerContent");
export const answerIdObjecter = zod.string().createValueObjecter("answerId");

export type AnswerContent = GetValueObject<typeof answerContentObjecter>;
export type AnswerId = GetValueObject<typeof answerIdObjecter>;

type InputCreateAnswerEntity = Omit<GetEntityProperties<typeof AnswerEntity>, "createdAt">;

export class AnswerEntity extends EntityHandler.create({
	id: answerIdObjecter,
	postId: postIdObjecter,
	content: answerContentObjecter,
	authorId: userIdObjecter,
	authorName: usernameObjecter,
	createdAt: commonDateObjecter,
}) {
	public static create(params: InputCreateAnswerEntity) {
		return new AnswerEntity({
			...params,
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public updateAuthorName(authorName: Username) {
		return this.update({
			authorName,
		});
	}
}

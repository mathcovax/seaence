import { commonDateObjecter, createEnum, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { postIdObjecter } from "./post";
import { answerRules } from "@vendors/entity-rules";
import { userIdObjecter, type Username, usernameObjecter } from "../common/user";

export const answerContentObjecter = zod.string()
	.min(answerRules.content.minLength)
	.max(answerRules.content.maxLength)
	.createValueObjecter("answerContent");
export const answerIdObjecter = zod.string().createValueObjecter("answerId");

export const answerStatusEnum = createEnum([
	"compliant",
	"unprocessed",
	"notCompliant",
]);
export const answerStatusObjecter = zod.enum(answerStatusEnum.toTuple()).createValueObjecter("answerStatus");

export type AnswerStatus = GetValueObject<typeof answerStatusObjecter>;
export type AnswerContent = GetValueObject<typeof answerContentObjecter>;
export type AnswerId = GetValueObject<typeof answerIdObjecter>;

type InputCreateAnswerEntity = Omit<GetEntityProperties<typeof AnswerEntity>, "createdAt" | "status">;

export class AnswerEntity extends EntityHandler.create({
	id: answerIdObjecter,
	postId: postIdObjecter,
	content: answerContentObjecter,
	authorId: userIdObjecter,
	authorName: usernameObjecter,
	status: answerStatusObjecter,
	createdAt: commonDateObjecter,
}) {
	public static create(params: InputCreateAnswerEntity) {
		return new AnswerEntity({
			...params,
			status: answerStatusObjecter.unsafeCreate("unprocessed"),
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public updateAuthorName(authorName: Username) {
		return this.update({
			authorName,
		});
	}

	public updateStatus(status: AnswerStatus["value"]) {
		return this.update({
			status: answerStatusObjecter.unsafeCreate(status),
		});
	}

	public isUnprocessed() {
		return this.status.value === "unprocessed";
	}
}

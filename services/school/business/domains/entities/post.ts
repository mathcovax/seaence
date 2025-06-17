import { commonDateObjecter, createEnum, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { postRules } from "@vendors/entity-rules";
import { userIdObjecter, type Username, usernameObjecter } from "../common/user";

export const postTopicObjecter = zod.string()
	.min(postRules.topic.minLength)
	.max(postRules.topic.maxLength)
	.createValueObjecter("postTopic");
export type PostTopic = GetValueObject<typeof postTopicObjecter>;

export const postContentObjecter = zod.string()
	.min(postRules.content.minLength)
	.max(postRules.content.maxLength)
	.createValueObjecter("postContent");
export type PostContent = GetValueObject<typeof postContentObjecter>;

export const postIdObjecter = zod.string().createValueObjecter("postId");
export type PostId = GetValueObject<typeof postIdObjecter>;

export const postAnswerCountObjecter = zod.number().createValueObjecter("postAnswerCount");
export type PostAnswerCount = GetValueObject<typeof postAnswerCountObjecter>;

export const nodeSameRawDocumentIdObjecter = zod.string().createValueObjecter("nodeSameRawDocumentId");
export type NodeSameRawDocumentId = GetValueObject<typeof nodeSameRawDocumentIdObjecter>;

export const postStatusEnum = createEnum([
	"compliant",
	"unprocessed",
	"notCompliant",
]);

export const postStatusObjecter = zod.enum(postStatusEnum.toTuple()).createValueObjecter("postStatus");
export type PostStatus = GetValueObject<typeof postStatusObjecter>;

const defaultAnswerCount = 0;

type InputCreatePostEntity = Omit<GetEntityProperties<typeof PostEntity>, "answerCount" | "createdAt" | "status">;

export class PostEntity extends EntityHandler.create({
	id: postIdObjecter,
	topic: postTopicObjecter,
	content: postContentObjecter,
	nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter,
	answerCount: postAnswerCountObjecter,
	authorId: userIdObjecter,
	authorName: usernameObjecter,
	status: postStatusObjecter,
	createdAt: commonDateObjecter,
}) {
	public static create(params: InputCreatePostEntity) {
		return new PostEntity({
			...params,
			status: postStatusObjecter.unsafeCreate("unprocessed"),
			answerCount: postAnswerCountObjecter.unsafeCreate(defaultAnswerCount),
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
		});
	}

	public updateAnswerCount(answerCount: PostAnswerCount) {
		return this.update({
			answerCount,
		});
	}

	public updateAuthorName(authorName: Username) {
		return this.update({
			authorName,
		});
	}

	public updateStatus(status: PostStatus["value"]) {
		return this.update({
			status: postStatusObjecter.unsafeCreate(status),
		});
	}

	public isUnprocessed() {
		return this.status.value === "unprocessed";
	}
}

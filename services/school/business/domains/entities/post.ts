import { commonDateObjecter, createEnum, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userObjecter } from "../common/user";
import { type Username } from "./user";
import { postRules } from "@vendors/entity-rules";

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
	"verified",
	"unprocessed",
	"not_compliant",
]);

export const postStatusObjecter = zod.enum(postStatusEnum.toTuple()).createValueObjecter("postStatus");
export type PostStatus = GetValueObject<typeof postStatusObjecter>;

const defaultAnswerCount = 0;

type InputCreatePostEntity = Omit<GetEntityProperties<typeof PostEntity>, "answerCount" | "createdAt">;

export class PostEntity extends EntityHandler.create({
	id: postIdObjecter,
	topic: postTopicObjecter,
	content: postContentObjecter,
	nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter,
	answerCount: postAnswerCountObjecter,
	author: userObjecter,
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
		return this.update(
			{
				answerCount,
			},
		);
	}

	public renameAuthor(newAuthorName: Username) {
		const updatedAuthor = this.author.value.update({
			username: newAuthorName,
		});

		return this.update({
			author: userObjecter.unsafeCreate(updatedAuthor),
		});
	}
}

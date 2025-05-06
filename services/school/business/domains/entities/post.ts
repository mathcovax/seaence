import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userObjecter } from "../common/user";

export const postTopicObjecter = zod.string().createValueObjecter("postTopic");
export type PostTopic = GetValueObject<typeof postTopicObjecter>;

export const postContentObjecter = zod.string().nullable().createValueObjecter("postContent");
export type PostContent = GetValueObject<typeof postContentObjecter>;

export const postIdObjecter = zod.string().createValueObjecter("postId");
export type PostId = GetValueObject<typeof postIdObjecter>;

export const postAnswerCountObjecter = zod.number().createValueObjecter("postAnswerCount");
export type PostAnswerCount = GetValueObject<typeof postAnswerCountObjecter>;

export const nodeSameRawDocumentIdObjecter = zod.string().createValueObjecter("nodeSameRawDocumentId");
export type NodeSameRawDocumentId = GetValueObject<typeof nodeSameRawDocumentIdObjecter>;

const defaultAnswerCount = 0;

type InputCreatePostEntity = Omit<GetEntityProperties<typeof PostEntity>, "answerCount" | "createdAt">;

export class PostEntity extends EntityHandler.create({
	id: postIdObjecter,
	topic: postTopicObjecter,
	content: postContentObjecter,
	nodeSameRawDocumentId: nodeSameRawDocumentIdObjecter,
	answerCount: postAnswerCountObjecter,
	author: userObjecter,
	createdAt: commonDateObjecter,
}) {
	public static create(params: InputCreatePostEntity) {
		return new PostEntity({
			...params,
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
}

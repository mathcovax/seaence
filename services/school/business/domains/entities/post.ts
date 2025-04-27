import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userObjecter } from "../common/user";
import { articleObjecter } from "../common/article";
import { dateObjecter } from "../common/date";

export const postTopicObjecter = zod.string().createValueObjecter("postTopic");
export const postContentObjecter = zod.string().nullable().createValueObjecter("postContent");
export const postIdObjecter = zod.string().createValueObjecter("postId");
export const postAnswerCountObjecter = zod.number().createValueObjecter("postAnswerCount");

export type PostTopic = GetValueObject<typeof postTopicObjecter>;
export type PostContent = GetValueObject<typeof postContentObjecter>;
export type PostId = GetValueObject<typeof postIdObjecter>;
export type PostAnswerCount = GetValueObject<typeof postAnswerCountObjecter>;

const defaultAnswerCount = 0;

type InputCreatePostEntity = Omit<GetEntityProperties<typeof PostEntity>, "answerCount" | "createdAt">;

export class PostEntity extends EntityHandler.create({
	id: postIdObjecter,
	topic: postTopicObjecter,
	content: postContentObjecter,
	article: articleObjecter,
	answerCount: postAnswerCountObjecter,
	author: userObjecter,
	createdAt: dateObjecter,
}) {
	public static create(params: InputCreatePostEntity) {
		return new PostEntity({
			...params,
			answerCount: postAnswerCountObjecter.unknownThrowCreate(defaultAnswerCount),
			createdAt: dateObjecter.unknownThrowCreate(new Date()),
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

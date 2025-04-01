import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { userObjecter } from "../common/user";
import { articleObjecter } from "../common/article";

export const postTopicObjecter = zod.string().createValueObjecter("postTopic");
export const postContentObjecter = zod.string().createValueObjecter("postContent");
export const postIdObjecter = zod.string().createValueObjecter("postId");

export type PostTopic = GetValueObject<typeof postTopicObjecter>;
export type PostContent = GetValueObject<typeof postContentObjecter>;
export type PostId = GetValueObject<typeof postIdObjecter>;

export class PostEntity extends EntityHandler.create({
	id: postIdObjecter,
	topic: postTopicObjecter,
	content: postContentObjecter,
	article: articleObjecter,
	author: userObjecter,
}) {
	public static create(params: GetEntityProperties<typeof PostEntity>) {
		return new PostEntity(params);
	}
}

import { EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";
import { articleIdObjecter } from "./article";
import { userIdObjecter } from "./user";

const postTopicObjecter = zod.string().createValueObjecter("postTopic");
const postContentObjecter = zod.string().createValueObjecter("postContent");
export const postIdObjecter = zod.string().createValueObjecter("postId");

export type PostTopic = GetValueObject<typeof postTopicObjecter>;
export type PostContent = GetValueObject<typeof postContentObjecter>;
export type PostId = GetValueObject<typeof postIdObjecter>;

export class PostEntity extends EntityHandler.create({
	topic: postTopicObjecter,
	content: postContentObjecter,
	articleId: articleIdObjecter,
	creatorId: userIdObjecter,
}) {
	public static create(params: GetEntityProperties<PostEntity>) {
		return new PostEntity(params);
	}
}

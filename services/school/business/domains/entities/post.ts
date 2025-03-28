import { EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";
import { articleIdObjecter } from "./article";
import { UserEntity } from "./user";

const postTopicObjecter = zod.string().createValueObjecter("postTopic");
const postContentObjecter = zod.string().createValueObjecter("postContent");
const creatorObjecter = zod.instanceof(UserEntity).createValueObjecter("creator");
export const postIdObjecter = zod.string().createValueObjecter("postId");

export type PostTopic = GetValueObject<typeof postTopicObjecter>;
export type PostContent = GetValueObject<typeof postContentObjecter>;
export type PostId = GetValueObject<typeof postIdObjecter>;
export type PostCreator = GetValueObject<typeof creatorObjecter>;

export class PostEntity extends EntityHandler.create({
	postId: postIdObjecter,
	topic: postTopicObjecter,
	content: postContentObjecter,
	articleId: articleIdObjecter,
	creator: creatorObjecter,
}) {
	public static create(params: GetEntityProperties<PostEntity>) {
		return new PostEntity(params);
	}
}

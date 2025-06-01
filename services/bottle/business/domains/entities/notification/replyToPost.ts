import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { BaseNotificationEntity, processedObjecter } from "./base";
import { replyToPostNotificationRules } from "@vendors/entity-rules";
import { usernameObjecter } from "@business/domains/common/user";
import { postIdObjecter } from "@business/domains/common/post";

// 7 days
const timeToLive = 604800;
const { summaryOfReplyPost } = replyToPostNotificationRules;

export const summaryOfReplyPostObjecter = zod
	.string()
	.min(summaryOfReplyPost.minLenght)
	.max(summaryOfReplyPost.maxlenght)
	.createValueObjecter("summaryOfReplyPost");
export type SummaryOfReplyPost = GetValueObject<typeof summaryOfReplyPostObjecter>;

export class ReplyToPostNotificationEntity extends EntityHandler.create(
	{
		postId: postIdObjecter,
		usernameOfReplyPost: usernameObjecter,
		summaryOfReplyPost: summaryOfReplyPostObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(params: Omit<
		GetEntityProperties<typeof ReplyToPostNotificationEntity>,
				"processed" | "createdAt" | "deleteAt"
	>) {
		return new ReplyToPostNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
			deleteAt: commonDateObjecter.unsafeCreate(new Date(Date.now() + timeToLive)),
		});
	}
}

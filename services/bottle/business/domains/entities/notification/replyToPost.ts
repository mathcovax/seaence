import { commonDateObjecter, EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { BaseNotificationEntity, createNotificationTypeObjecter, processedObjecter } from "./base";
import { replyToPostNotificationRules } from "@vendors/entity-rules";
import { postIdObjecter } from "@business/domains/common/post";
import { usernameObjecter } from "../user";

const { summaryOfReplyPost } = replyToPostNotificationRules;

export const summaryOfReplyPostObjecter = zod
	.string()
	.min(summaryOfReplyPost.minLenght)
	.max(summaryOfReplyPost.maxlenght)
	.createValueObjecter("summaryOfReplyPost");
export type SummaryOfReplyPost = GetValueObject<typeof summaryOfReplyPostObjecter>;

export const replyToPostNotificationTypeObjecter = createNotificationTypeObjecter("replyToPostNotificationType");
export type ReplyToPostNotificationType = GetValueObject<typeof replyToPostNotificationTypeObjecter>;

export class ReplyToPostNotificationEntity extends EntityHandler.create(
	{
		type: replyToPostNotificationTypeObjecter,
		postId: postIdObjecter,
		usernameOfReplyPost: usernameObjecter,
		summaryOfReplyPost: summaryOfReplyPostObjecter,
	},
	BaseNotificationEntity,
) {
	public static create(params: Omit<
		GetEntityProperties<typeof ReplyToPostNotificationEntity>,
				"processed" | "createdAt" | "deleteAt" | "type"
	>) {
		return new ReplyToPostNotificationEntity({
			...params,
			processed: processedObjecter.unsafeCreate(false),
			createdAt: commonDateObjecter.unsafeCreate(new Date()),
			deleteAt: commonDateObjecter.unsafeCreate(new Date(Date.now() + this.timeToLive)),
			type: replyToPostNotificationTypeObjecter.unsafeCreate("replyToPostNotificationType"),
		});
	}

	public static readonly timeToLive = BaseNotificationEntity.timeToLive;
}

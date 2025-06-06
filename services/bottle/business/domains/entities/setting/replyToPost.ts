import { EntityHandler, type GetValueObject, type GetEntityProperties } from "@vendors/clean";
import { BaseNotificationSettingEntity } from "./base";
import { postIdObjecter } from "@business/domains/common/post";
import { createNotificationTypeObjecter } from "../notification/base";

export const replyToPostNotificationSettingTypeObjecter = createNotificationTypeObjecter("replyToPostNotificationSettingType");
export type ReplyToPostNotificationSettingType = GetValueObject<typeof replyToPostNotificationSettingTypeObjecter>;

export class ReplyToPostNotificationSettingEntity extends EntityHandler.create(
	{
		type: replyToPostNotificationSettingTypeObjecter,
		postId: postIdObjecter,
	},
	BaseNotificationSettingEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof ReplyToPostNotificationSettingEntity>,
			"type"
		>,
	) {
		return new ReplyToPostNotificationSettingEntity({
			...params,
			type: replyToPostNotificationSettingTypeObjecter.unsafeCreate("replyToPostNotificationSettingType"),
		});
	}
}

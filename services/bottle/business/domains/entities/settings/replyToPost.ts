import { EntityHandler, type GetValueObject, type GetEntityProperties } from "@vendors/clean";
import { BaseNotificationSettingsEntity } from "./base";
import { postIdObjecter } from "@business/domains/common/post";
import { createNotificationTypeObjecter } from "../notification/base";

export const replyToPostNotificationSettingsTypeObjecter = createNotificationTypeObjecter("replyToPostNotificationSettingsType");
export type ReplyToPostNotificationSettingsType = GetValueObject<typeof replyToPostNotificationSettingsTypeObjecter>;

export class ReplyToPostNotificationSettingsEntity extends EntityHandler.create(
	{
		type: replyToPostNotificationSettingsTypeObjecter,
		postId: postIdObjecter,
	},
	BaseNotificationSettingsEntity,
) {
	public static create(
		params: Omit<
			GetEntityProperties<typeof ReplyToPostNotificationSettingsEntity>,
			"type"
		>,
	) {
		return new ReplyToPostNotificationSettingsEntity({
			...params,
			type: replyToPostNotificationSettingsTypeObjecter.unsafeCreate("replyToPostNotificationSettingsType"),
		});
	}
}

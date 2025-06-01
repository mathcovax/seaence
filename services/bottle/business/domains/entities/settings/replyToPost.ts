import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { BaseNotificationSettingsEntity } from "./base";
import { postIdObjecter } from "@business/domains/common/post";

export class ReplyToPostNotificationSettingsEntity extends EntityHandler.create(
	{
		postId: postIdObjecter,
	},
	BaseNotificationSettingsEntity,
) {
	public static create(params: GetEntityProperties<typeof ReplyToPostNotificationSettingsEntity>) {
		return new ReplyToPostNotificationSettingsEntity(params);
	}
}

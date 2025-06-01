import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { WarningEntity } from ".";

export const postWarningPostIdObjecter = zod
	.string()
	.createValueObjecter("postWarningPostId");

export type PostWarningPostId = GetValueObject<typeof postWarningPostIdObjecter>;

export class PostWarningEntity extends EntityHandler.create(
	{
		postId: postWarningPostIdObjecter,
	},
	WarningEntity,
) {
	public static create(params: GetEntityProperties<typeof PostWarningEntity>) {
		return new PostWarningEntity(params);
	}
}

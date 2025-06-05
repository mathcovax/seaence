import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { BaseUserWarningEntity } from "./base";

export const postUserWarningTypeObjecter = zod
	.literal("post")
	.createValueObjecter("postUserWarningType");
export type PostUserWarningType = GetValueObject<typeof postUserWarningTypeObjecter>;

export const postUserWarningPostIdObjecter = zod
	.string()
	.createValueObjecter("postUserWarningPostId");

export type PostUserWarningPostId = GetValueObject<typeof postUserWarningPostIdObjecter>;

export type InputCreatePostUserWarningEntity = Omit<
	GetEntityProperties<typeof PostUserWarningEntity>,
	"type"
>;

export class PostUserWarningEntity extends EntityHandler.create(
	{
		type: postUserWarningTypeObjecter,
		postId: postUserWarningPostIdObjecter,
	},
	BaseUserWarningEntity,
) {
	public static create(params: InputCreatePostUserWarningEntity) {
		return new PostUserWarningEntity({
			...params,
			type: postUserWarningTypeObjecter.unsafeCreate("post"),
		});
	}
}

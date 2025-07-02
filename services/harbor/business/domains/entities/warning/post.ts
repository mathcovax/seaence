import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";
import { UserWarningEntity } from "./base";
import { postIdObjecter } from "@business/domains/common/post";

export const postUserWarningTypeObjecter = zod
	.literal("post")
	.createValueObjecter("postUserWarningType");
export type PostUserWarningType = GetValueObject<typeof postUserWarningTypeObjecter>;

export type InputCreatePostUserWarningEntity = Omit<
	GetEntityProperties<typeof PostUserWarningEntity>,
	"type"
>;

export class PostUserWarningEntity extends EntityHandler.create(
	{
		type: postUserWarningTypeObjecter,
		postId: postIdObjecter,
	},
	UserWarningEntity,
) {
	public static create(params: InputCreatePostUserWarningEntity) {
		return new PostUserWarningEntity({
			...params,
			type: postUserWarningTypeObjecter.unsafeCreate("post"),
		});
	}
}

import { type GetValueObject, zod } from "@vendors/clean";

export const postIdObjecter = zod
	.string()
	.createValueObjecter("postId");
export type PostId = GetValueObject<typeof postIdObjecter>;

import { type GetValueObject, zod } from "@vendors/clean";

export const userIdObjecter = zod.string().createValueObjecter("userId");
export type UserId = GetValueObject<typeof userIdObjecter>;

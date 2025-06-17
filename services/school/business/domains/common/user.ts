import { zod, type GetValueObject } from "@vendors/clean";

export const userIdObjecter = zod.string().createValueObjecter("userId");
export const usernameObjecter = zod.string().createValueObjecter("username");

export type UserId = GetValueObject<typeof userIdObjecter>;
export type Username = GetValueObject<typeof usernameObjecter>;

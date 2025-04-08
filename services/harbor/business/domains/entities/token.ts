import { type GetValueObject, zod } from "@vendors/clean";

export const tokenObjecter = zod.string().createValueObjecter("token");

export type Token = GetValueObject<typeof tokenObjecter>;

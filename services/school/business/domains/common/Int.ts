import { type GetValueObject, zod } from "@vendors/clean";

export const intObjecter = zod.number().int().createValueObjecter("int");

export type Int = GetValueObject<typeof intObjecter>;

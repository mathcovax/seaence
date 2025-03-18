import { type GetValueObject } from "@vendors/clean";

export const createdAtObjecter = zod.date().createValueObjecter("createdAt");

export type CreatedAt = GetValueObject<typeof createdAtObjecter>;

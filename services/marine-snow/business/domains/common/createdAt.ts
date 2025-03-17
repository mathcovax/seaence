import { type GetValueObject } from "@vendors/clean";

export const createdAt = zod.date().createValueObjecter("createdAt");

export type CreatedAt = GetValueObject<typeof createdAt>;

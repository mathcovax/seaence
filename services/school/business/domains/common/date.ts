import { type GetValueObject, zod } from "@vendors/clean";

export const dateObjecter = zod.date().createValueObjecter("date");

export type Date = GetValueObject<typeof dateObjecter>;

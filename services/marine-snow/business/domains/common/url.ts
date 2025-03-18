import { type GetValueObject } from "@vendors/clean";

export const urlObjecter = zod.string().url().createValueObjecter("url");

export type Url = GetValueObject<typeof urlObjecter>;

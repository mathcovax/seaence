import { type GetValueObject } from "@vendors/clean";

export const url = zod.string().url().createValueObjecter("url");

export type Url = GetValueObject<typeof url>;

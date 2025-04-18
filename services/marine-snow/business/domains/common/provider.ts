import { createEnum, zod, type GetValueObject } from "@vendors/clean";

export const providerEnum = createEnum(["pubmed"]);

export const providerObjecter = zod.enum(providerEnum.toTuple()).createValueObjecter("provider");

export type Provider = GetValueObject<typeof providerObjecter>;

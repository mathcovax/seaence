import { createEnum, type GetEnumValue } from "@vendors/clean";

export const providerEnum = createEnum(["pubmed"]);

export type Provider = GetEnumValue<typeof providerEnum>;

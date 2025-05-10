import { createEnum, zod } from "@vendors/clean";

export const providerEnum = createEnum(["pubmed"]);

export const providerObjecter = zod
	.enum(providerEnum.toTuple())
	.createValueObjecter("provider");

import { type GetValueObject, zod } from "@vendors/clean";

export const rawTitleObjecter = zod
	.string()
	.createValueObjecter("rawTitle");

export type RawTitle = GetValueObject<typeof rawTitleObjecter>;

export const rawAuthorObjecter = zod
	.object({
		name: zod.string(),
		affiliation: zod.string().array().nullable(),
	})
	.createValueObjecter("rawAuthor");

export type RawAuthor = GetValueObject<typeof rawAuthorObjecter>;

export const rawGrantObjecter = zod
	.object({
		acronym: zod.string().nullable(),
		agency: zod.string(),
		country: zod.string().nullable(),
	})
	.createValueObjecter("rawGrants");

export type RawGrant = GetValueObject<typeof rawGrantObjecter>;

export const rawAbstractObjecter = zod
	.string()
	.createValueObjecter("rawAbtract");

export type RawAbstract = GetValueObject<typeof rawAbstractObjecter>;

export const rawAbstractPartObjecter = zod
	.object({
		label: zod.string(),
		content: zod.string(),
		nlmCategory: zod.string(),
	})
	.createValueObjecter("rawAbstractPart");

export type RawAbstractPart = GetValueObject<typeof rawAbstractPartObjecter>;


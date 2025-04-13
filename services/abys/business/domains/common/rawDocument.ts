import { type GetValueObject, urlObjecter, zod } from "@vendors/clean";
import { abstractSectionNameEnum } from "./abtrasctSection";

export const rawResourceUrlObjecter = urlObjecter
	.declination("rawResourceUrl");

export type RawResourceUrl = GetValueObject<typeof rawResourceUrlObjecter>;

export const rawTitleObjecter = zod
	.string()
	.createValueObjecter("rawTitle");

export type RawTitle = GetValueObject<typeof rawTitleObjecter>;

export const rawAuthorObjecter = zod
	.object({
		name: zod.string(),
		affiliations: zod.string().array().nullable(),
	})
	.createValueObjecter("rawAuthor");

export type RawAuthor = GetValueObject<typeof rawAuthorObjecter>;

export const rawGrantObjecter = zod
	.object({
		acronym: zod.string().nullable(),
		agency: zod.string(),
		country: zod.string().nullable(),
	})
	.createValueObjecter("rawGrant");

export type RawGrant = GetValueObject<typeof rawGrantObjecter>;

export const rawAbstractObjecter = zod
	.string()
	.createValueObjecter("rawAbtract");

export type RawAbstract = GetValueObject<typeof rawAbstractObjecter>;

export const rawAbstractPartObjecter = zod
	.object({
		label: zod.enum(abstractSectionNameEnum.toTuple()),
		content: zod.string(),
	})
	.createValueObjecter("rawAbstractPart");

export type RawAbstractPart = GetValueObject<typeof rawAbstractPartObjecter>;

export const rawKeywordObjecter = zod
	.object({
		value: zod.string(),
	})
	.createValueObjecter("rawKeyword");

export type RawKeyword = GetValueObject<typeof rawKeywordObjecter>;

import { type GetValueObject } from "@vendors/clean";

export const providerValues = [
	"pubmed",
	"pedro",
	"sciencedirect",
] as const;

export const provider = zod.enum(providerValues).createValueObjecter("provider");

export type Provider = GetValueObject<typeof provider>;

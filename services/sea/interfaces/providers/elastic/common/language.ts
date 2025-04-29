import { createEnum, type GetEnumValue } from "@vendors/clean";

export const languageEnum = createEnum([
	"fr-Fr",
	"en-US",
]);

export type Language = GetEnumValue<typeof languageEnum>;

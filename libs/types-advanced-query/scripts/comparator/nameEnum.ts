import { createEnum, type GetEnumValue } from "@vendors/clean";

export const comparatorNameEnum = createEnum([
	"text",
	"strictText",
	"author",
	"year",
	"yearInterval",
	"articleType",
	"provider",
]);

export type ComparatorNameEnumValue = GetEnumValue<typeof comparatorNameEnum>;

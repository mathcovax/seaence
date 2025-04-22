import { createEnum, type GetEnumValue, zod } from "@vendors/clean";

export const textFieldEnum = createEnum([
	"allField",
	"title",
	"abstract",
]);

export type TextFieldEnumValue = GetEnumValue<typeof textFieldEnum>

export const yearFieldEnum = createEnum([
	"allDate",
	"webDate",
	"journalDate",
]);

export type YearFieldEnumValue = GetEnumValue<typeof yearFieldEnum>

export interface BaseComparator<
	GenericName extends string,
> {
	type: "comparator";
	name: GenericName;
}

export interface ComparatorText extends BaseComparator<"text"> {
	field: TextFieldEnumValue;
	value: string;
}

export interface ComparatorYear extends BaseComparator<"year"> {
	field: YearFieldEnumValue;
	value: number;
}

export type Comparator =
	| ComparatorText
	| ComparatorYear;

export const comparatorTextSchema = zod.object({
	type: zod.literal("comparator"),
	name: zod.literal("text"),
	field: zod.enum(textFieldEnum.toTuple()),
	value: zod.string(),
});

export const comparatorYearSchema = zod.object({
	type: zod.literal("comparator"),
	name: zod.literal("year"),
	field: zod.enum(yearFieldEnum.toTuple()),
	value: zod.number(),
});

export const comparatorSchema = zod.union([
	comparatorTextSchema,
	comparatorYearSchema,
]);

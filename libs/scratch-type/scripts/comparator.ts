import { createEnum, type GetEnumValue, zod } from "@vendors/clean";

export const textFieldEnum = createEnum([
	"allField",
	"title",
	"abstract",
]);

export const yearFieldEnum = createEnum([
	"allDate",
	"webDate",
	"journalDate",
]);

export interface BaseComparator<
	GenericName extends string,
> {
	type: "comparator";
	name: GenericName;
}

export interface ComparatorText extends BaseComparator<"text"> {
	field: GetEnumValue<typeof textFieldEnum>;
	value: string;
}

export interface ComparatorYear extends BaseComparator<"year"> {
	field: GetEnumValue<typeof yearFieldEnum>;
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

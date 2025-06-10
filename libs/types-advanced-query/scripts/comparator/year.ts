import { createEnum, type GetEnumValue, zod } from "@vendors/clean";
import { type BaseComparator } from ".";
import { type ZodType } from "zod";

export const yearFieldEnum = createEnum([
	"allDate",
	"webDate",
	"journalDate",
]);

export type YearFieldEnumValue = GetEnumValue<typeof yearFieldEnum>;

export interface ComparatorYear extends BaseComparator<"year"> {
	field: YearFieldEnumValue;
	value: number;
}

export const comparatorYearConfig = {
	min: 1900,
	max: 3000,
};

export const comparatorYearFieldSchema = zod
	.enum(yearFieldEnum.toTuple());

export const comparatorYearValueSchema = zod
	.number()
	.max(comparatorYearConfig.max)
	.min(comparatorYearConfig.min);

export const comparatorYearSchema: ZodType<ComparatorYear> = zod.object({
	type: zod.literal("comparator"),
	name: zod.literal("year"),
	field: zod.enum(yearFieldEnum.toTuple()),
	value: comparatorYearValueSchema,
});

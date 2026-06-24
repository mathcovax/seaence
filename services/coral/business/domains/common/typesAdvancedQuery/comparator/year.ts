import { createEnum, DPE, type GetEnumValue } from "@duplojs/utils";
import { type BaseComparator, createBaseComparator } from "./base";

export const yearFieldEnum = createEnum([
	"allDate",
	"webDate",
	"journalDate",
]);

export type YearFieldUnion = GetEnumValue<typeof yearFieldEnum>;

export interface ComparatorYear extends BaseComparator<"year"> {
	field: YearFieldUnion;
	value: number;
}

export const comparatorYearConfig = {
	min: 1900,
	max: 3000,
} as const;

export const comparatorYearFieldSchema = DPE.literal(yearFieldEnum.toTuple());

export const comparatorYearValueSchema = DPE
	.number()
	.max(comparatorYearConfig.max)
	.min(comparatorYearConfig.min);

export const comparatorYearSchema = createBaseComparator("year")
	.extends({
		field: comparatorYearFieldSchema,
		value: comparatorYearValueSchema,
	});

import { type ZodType } from "zod";
import { type BaseComparator } from ".";
import { comparatorYearFieldSchema, comparatorYearValueSchema, type YearFieldEnumValue } from "./year";
import { zod } from "@vendors/clean";

export interface ComparatorYearInterval extends BaseComparator<"yearInterval"> {
	field: YearFieldEnumValue;
	value: {
		from: number;
		to: number;
	};
}

export const comparatorYearIntervalSchema: ZodType<ComparatorYearInterval> = zod.object({
	type: zod.literal("comparator"),
	name: zod.literal("yearInterval"),
	field: comparatorYearFieldSchema,
	value: zod
		.object({
			from: comparatorYearValueSchema,
			to: comparatorYearValueSchema,
		})
		.refine(({ from, to }) => to >= from),
});

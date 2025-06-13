import { type ZodType } from "zod";
import { createBaseComparator, type BaseComparator } from "./base";
import { comparatorYearFieldSchema, comparatorYearValueSchema, type YearFieldEnumValue } from "./year";
import { zod } from "@vendors/clean";

export interface ComparatorYearInterval extends BaseComparator<"yearInterval"> {
	field: YearFieldEnumValue;
	value: {
		from: number;
		to: number;
	};
}

export const comparatorYearIntervalSchema: ZodType<ComparatorYearInterval>
	= createBaseComparator("yearInterval")
		.extend({
			field: comparatorYearFieldSchema,
			value: zod
				.object({
					from: comparatorYearValueSchema,
					to: comparatorYearValueSchema,
				}),
		});

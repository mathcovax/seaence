import { DPE } from "@duplojs/utils";
import { type BaseComparator, createBaseComparator } from "./base";
import {
	comparatorYearFieldSchema,
	comparatorYearValueSchema,
	type YearFieldUnion,
} from "./year";

export interface ComparatorYearInterval extends BaseComparator<"yearInterval"> {
	field: YearFieldUnion;
	value: {
		from: number;
		to: number;
	};
}

export const comparatorYearIntervalSchema = createBaseComparator("yearInterval")
	.extends({
		field: comparatorYearFieldSchema,
		value: DPE
			.object({
				from: comparatorYearValueSchema,
				to: comparatorYearValueSchema,
			}),
	});

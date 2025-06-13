import { type ZodType } from "zod";
import { createBaseComparator, type BaseComparator } from "./base";
import { comparatorTextValueSchema } from "./text";

export interface ComparatorAuthor extends BaseComparator<"author"> {
	value: string;
}

export const comparatorAuthorSchema: ZodType<ComparatorAuthor>
	= createBaseComparator("author")
		.extend({
			value: comparatorTextValueSchema,
		});

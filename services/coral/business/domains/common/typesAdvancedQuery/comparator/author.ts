import { type BaseComparator, createBaseComparator } from "./base";
import { comparatorTextValueSchema } from "./text";

export interface ComparatorAuthor extends BaseComparator<"author"> {
	value: string;
}

export const comparatorAuthorSchema = createBaseComparator("author")
	.extends({
		value: comparatorTextValueSchema,
	});

import { createBaseComparator, type BaseComparator } from "./base";
import { comparatorTextFieldSchema, comparatorTextValueSchema, type TextFieldEnumValue } from "./text";
import { type ZodType } from "zod";

export interface ComparatorStrictText extends BaseComparator<"strictText"> {
	field: TextFieldEnumValue;
	value: string;
}

export const comparatorStrictTextSchema: ZodType<ComparatorStrictText>
	= createBaseComparator("strictText")
		.extend({
			field: comparatorTextFieldSchema,
			value: comparatorTextValueSchema,
		});

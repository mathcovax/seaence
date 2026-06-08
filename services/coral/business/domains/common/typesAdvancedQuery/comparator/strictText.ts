import { type BaseComparator, createBaseComparator } from "./base";
import {
	comparatorTextFieldSchema,
	comparatorTextValueSchema,
	type TextFieldUnion,
} from "./text";

export interface ComparatorStrictText extends BaseComparator<"strictText"> {
	field: TextFieldUnion;
	value: string;
}

export const comparatorStrictTextSchema = createBaseComparator("strictText")
	.extends({
		field: comparatorTextFieldSchema,
		value: comparatorTextValueSchema,
	});

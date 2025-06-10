import { zod } from "@vendors/clean";
import { type BaseComparator } from ".";
import { comparatorTextFieldSchema, comparatorTextValueSchema, type TextFieldEnumValue } from "./text";
import { type ZodType } from "zod";

export interface ComparatorStrictText extends BaseComparator<"strictText"> {
	field: TextFieldEnumValue;
	value: string;
}

export const comparatorStrictTextSchema: ZodType<ComparatorStrictText> = zod.object({
	type: zod.literal("comparator"),
	name: zod.literal("strictText"),
	field: comparatorTextFieldSchema,
	value: comparatorTextValueSchema,
});

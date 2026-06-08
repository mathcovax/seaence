import { createEnum, DPE, type GetEnumValue } from "@duplojs/utils";
import { type BaseComparator, createBaseComparator } from "./base";

export const textFieldEnum = createEnum([
	"allField",
	"title",
	"abstract",
	"keywords",
]);

export type TextFieldUnion = GetEnumValue<typeof textFieldEnum>;

export interface ComparatorText extends BaseComparator<"text"> {
	field: TextFieldUnion;
	value: string;
}

export const comparatorTextConfig = {
	minLength: 2,
	maxLength: 50,
} as const;

export const comparatorTextFieldSchema = DPE.literal(textFieldEnum.toTuple());

export const comparatorTextValueSchema = DPE
	.string()
	.min(comparatorTextConfig.minLength)
	.max(comparatorTextConfig.maxLength);

export const comparatorTextSchema = createBaseComparator("text")
	.extends({
		field: comparatorTextFieldSchema,
		value: comparatorTextValueSchema,
	});

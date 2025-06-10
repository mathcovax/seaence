import { createEnum, zod, type GetEnumValue } from "@vendors/clean";
import { type BaseComparator } from ".";
import { type ZodType } from "zod";

export const textFieldEnum = createEnum([
	"allField",
	"title",
	"abstract",
	"keywords",
]);

export type TextFieldEnumValue = GetEnumValue<typeof textFieldEnum>;

export interface ComparatorText extends BaseComparator<"text"> {
	field: TextFieldEnumValue;
	value: string;
}

export const comparatorTextConfig = {
	minLength: 2,
	maxLength: 50,
};

export const comparatorTextFieldSchema = zod
	.enum(textFieldEnum.toTuple());

export const comparatorTextValueSchema = zod
	.string()
	.min(comparatorTextConfig.minLength)
	.max(comparatorTextConfig.maxLength);

export const comparatorTextSchema: ZodType<ComparatorText> = zod.object({
	type: zod.literal("comparator"),
	name: zod.literal("text"),
	field: comparatorTextFieldSchema,
	value: comparatorTextValueSchema,
});

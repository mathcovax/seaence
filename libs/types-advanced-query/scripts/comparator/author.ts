import { type ZodType } from "zod";
import { type BaseComparator } from ".";
import { zod } from "@vendors/clean";
import { comparatorTextValueSchema } from "./text";

export interface ComparatorAuthor extends BaseComparator<"author"> {
	value: string;
}

export const comparatorAuthorSchema: ZodType<ComparatorAuthor> = zod.object({
	type: zod.literal("comparator"),
	name: zod.literal("author"),
	value: comparatorTextValueSchema,
});

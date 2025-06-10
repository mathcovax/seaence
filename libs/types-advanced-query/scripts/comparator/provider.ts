import { createEnum, zod, type GetEnumValue } from "@vendors/clean";
import { type BaseComparator } from ".";
import { type ZodType } from "zod";

export const providerEnum = createEnum(["pubmed"]);

export type ProviderEnumValue = GetEnumValue<typeof providerEnum>;

export interface ComparatorProvider extends BaseComparator<"provider"> {
	value: ProviderEnumValue[];
}

export const comparatorProviderSchema: ZodType<ComparatorProvider> = zod.object({
	type: zod.literal("comparator"),
	name: zod.literal("provider"),
	value: zod.enum(providerEnum.toTuple()).array(),
});

import { createEnum, zod, type GetEnumValue } from "@vendors/clean";
import { createBaseComparator, type BaseComparator } from "./base";
import { type ZodType } from "zod";

export const providerEnum = createEnum(["pubmed"]);

export type ProviderEnumValue = GetEnumValue<typeof providerEnum>;

export interface ComparatorProvider extends BaseComparator<"provider"> {
	value: ProviderEnumValue[];
}

export const comparatorProviderConfig = {
	minContent: 1,
};

export const comparatorProviderSchema: ZodType<ComparatorProvider>
	= createBaseComparator("provider")
		.extend({
			value: zod
				.enum(providerEnum.toTuple())
				.array()
				.min(comparatorProviderConfig.minContent),
		});

import { createEnum, DPE, type GetEnumValue } from "@duplojs/utils";
import { type BaseComparator, createBaseComparator } from "./base";

export const providerEnum = createEnum(["pubmed"]);

export type ProviderUnion = GetEnumValue<typeof providerEnum>;

export interface ComparatorProvider extends BaseComparator<"provider"> {
	value: ProviderUnion[];
}

export const comparatorProviderConfig = {
	minContent: 1,
} as const;

export const comparatorProviderSchema = createBaseComparator("provider")
	.extends({
		value: DPE
			.literal(providerEnum.toTuple())
			.array()
			.min(comparatorProviderConfig.minContent),
	});

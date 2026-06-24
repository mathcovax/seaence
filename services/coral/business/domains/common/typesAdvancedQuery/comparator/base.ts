import { createEnum, DPE, type GetEnumValue } from "@duplojs/utils";

export const comparatorNameEnum = createEnum([
	"text",
	"strictText",
	"author",
	"year",
	"yearInterval",
	"articleType",
	"provider",
]);

export type ComparatorNameUnion = GetEnumValue<typeof comparatorNameEnum>;

export const comparatorBoostEnum = createEnum([
	"1",
	"2",
	"3",
]);

export type ComparatorBoostUnion = GetEnumValue<typeof comparatorBoostEnum>;

export interface BaseComparator<
	GenericName extends ComparatorNameUnion,
> {
	type: "comparator";
	name: GenericName;
	boost: ComparatorBoostUnion;
}

export function createBaseComparator<
	GenericName extends ComparatorNameUnion,
>(
	name: GenericName,
) {
	return DPE.object({
		type: DPE.literal("comparator"),
		name: DPE.literal(name),
		boost: DPE.literal(comparatorBoostEnum.toTuple()),
	});
}

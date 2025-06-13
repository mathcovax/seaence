import { createEnum, zod, type GetEnumValue } from "@vendors/clean";

export const comparatorNameEnum = createEnum([
	"text",
	"strictText",
	"author",
	"year",
	"yearInterval",
	"articleType",
	"provider",
]);

export type ComparatorNameEnumValue = GetEnumValue<typeof comparatorNameEnum>;

export const comparatorBoostEnum = createEnum([
	"1",
	"2",
	"3",
]);

export type ComparatorBoostEnumValue = GetEnumValue<typeof comparatorBoostEnum>;

export interface BaseComparator<
	GenericName extends ComparatorNameEnumValue,
> {
	type: "comparator";
	name: GenericName;
	boost: ComparatorBoostEnumValue;
}

export function createBaseComparator<
	GenericName extends ComparatorNameEnumValue,
>(
	name: GenericName,
) {
	return zod.object({
		type: zod.literal("comparator"),
		name: zod.literal(name),
		boost: zod.enum(comparatorBoostEnum.toTuple()),
	});
}

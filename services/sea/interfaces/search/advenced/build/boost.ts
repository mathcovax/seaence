import { type AvailableField } from "@interfaces/providers/elastic/indexes/document";
import { type ComparatorBoostEnumValue } from "@vendors/types-advanced-query/comparator/base";

const comparatorBoostToValue = {
	1: undefined,
	2: 20,
	3: 40,
} as const satisfies Record<ComparatorBoostEnumValue, number | undefined>;

export function formatFieldWithBoost<
	GenericAvailableField extends AvailableField,
>(
	field: GenericAvailableField,
	comparatorBoost: ComparatorBoostEnumValue,
): GenericAvailableField | `${GenericAvailableField}^${number}` {
	return comparatorBoostToValue[comparatorBoost]
		? `${field}^${comparatorBoostToValue[comparatorBoost]}`
		: field;
}

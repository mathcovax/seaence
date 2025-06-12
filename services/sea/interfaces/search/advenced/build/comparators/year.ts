import { type estypes } from "@elastic/elasticsearch";
import { type AvailableField, availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type ComparatorYear, type YearFieldEnumValue } from "@vendors/types-advanced-query";
import { formatFieldWithBoost } from "../boost";

const fieldsMapper = {
	webDate: [availableFieldEnum["webPublishSplitDate.year"]],
	journalDate: [availableFieldEnum["journalPublishSplitDate.year"]],
	allDate: undefined,
} as const satisfies Record<YearFieldEnumValue, AvailableField[] | undefined>;

const allFieldValue = Object
	.values(fieldsMapper)
	.flatMap(
		(fields) => fields
			? fields
			: [],
	);

export function buildYearComparator(
	comparatorYear: ComparatorYear,
): estypes.QueryDslQueryContainer {
	const fields = (fieldsMapper[comparatorYear.field] ?? allFieldValue)
		.map((field) => formatFieldWithBoost(
			field,
			comparatorYear.boost,
		));

	return {
		bool: {
			should: fields.map(
				(field) => ({
					term: {
						[field]: comparatorYear.value,
					},
				}),
			),
			minimum_should_match: 1,
		},
	};
}

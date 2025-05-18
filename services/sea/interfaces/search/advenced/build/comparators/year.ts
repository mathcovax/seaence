import { type estypes } from "@elastic/elasticsearch";
import { type AvailableField, availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type ComparatorYear, type YearFieldEnumValue } from "@vendors/types-advanced-query";

const fieldsMapper: Record<YearFieldEnumValue, AvailableField[] | undefined> = {
	webDate: [availableFieldEnum["webPublishSplitDate.year"]],
	journalDate: [availableFieldEnum["journalPublishSplitDate.year"]],
	allDate: undefined,
};

const allFieldValue = Object
	.values(fieldsMapper)
	.flatMap(
		(fields) => fields
			? fields
			: [],
	);

export function buildYearOperator(comparatorYear: ComparatorYear): estypes.QueryDslQueryContainer {
	const fields = fieldsMapper[comparatorYear.field] ?? allFieldValue;

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

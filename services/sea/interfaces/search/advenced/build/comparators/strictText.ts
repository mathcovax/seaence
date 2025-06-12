import { type estypes } from "@elastic/elasticsearch";
import { type AvailableField, availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type TextFieldEnumValue, type ComparatorStrictText } from "@vendors/types-advanced-query";
import { formatFieldWithBoost } from "../boost";

const fieldsMapper = {
	abstract: [availableFieldEnum["abstract.strict"]],
	title: [availableFieldEnum["title.strict"]],
	keywords: [availableFieldEnum["keywords.strict"]],
	allField: undefined,
} as const satisfies Record<TextFieldEnumValue, AvailableField[] | undefined>;

const allFieldValue = Object
	.values(fieldsMapper)
	.flatMap(
		(fields) => fields
			? fields
			: [],
	);

export function buildStrictTextComparator(
	comparatorStrictText: ComparatorStrictText,
): estypes.QueryDslQueryContainer {
	const fields = (fieldsMapper[comparatorStrictText.field] ?? allFieldValue)
		.map((field) => formatFieldWithBoost(
			field,
			comparatorStrictText.boost,
		));

	return {
		multi_match: {
			query: comparatorStrictText.value,
			type: "phrase",
			fields,
		},
	};
}

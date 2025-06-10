import { type estypes } from "@elastic/elasticsearch";
import { type AvailableField, availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type TextFieldEnumValue, type ComparatorStrictText } from "@vendors/types-advanced-query";

const fieldsMapper: Record<TextFieldEnumValue, AvailableField[] | undefined> = {
	abstract: [availableFieldEnum["abstract.strict"]],
	title: [availableFieldEnum["title.strict"]],
	keywords: [availableFieldEnum["keywords.strict"]],
	allField: undefined,
};

const allFieldValue = Object
	.values(fieldsMapper)
	.flatMap(
		(fields) => fields
			? fields
			: [],
	);

export function buildStrictTextComparator(comparatorStrictText: ComparatorStrictText): estypes.QueryDslQueryContainer {
	const fields = fieldsMapper[comparatorStrictText.field] ?? allFieldValue;

	return {
		multi_match: {
			query: comparatorStrictText.value,
			type: "phrase",
			fields,
		},
	};
}

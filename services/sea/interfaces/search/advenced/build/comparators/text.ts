import { type estypes } from "@elastic/elasticsearch";
import { type AvailableField, availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type TextFieldEnumValue, type ComparatorText } from "@vendors/types-advanced-query";

const fieldsMapper: Record<TextFieldEnumValue, AvailableField[] | undefined> = {
	abstract: [availableFieldEnum["abstract.stemmed"], availableFieldEnum.abstract],
	title: [availableFieldEnum["title.stemmed"], availableFieldEnum.title],
	keywords: [availableFieldEnum.keywords],
	allField: undefined,
};

const allFieldValue = Object
	.values(fieldsMapper)
	.flatMap(
		(fields) => fields
			? fields
			: [],
	);

export function buildTextComparator(comparatorText: ComparatorText): estypes.QueryDslQueryContainer {
	const fields = fieldsMapper[comparatorText.field] ?? allFieldValue;

	return {
		multi_match: {
			query: comparatorText.value,
			fields,
		},
	};
}

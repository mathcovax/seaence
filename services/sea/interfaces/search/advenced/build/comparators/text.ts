import { type estypes } from "@elastic/elasticsearch";
import { type AvailableField, availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type TextFieldEnumValue, type ComparatorText } from "@vendors/types-advanced-query";
import { formatFieldWithBoost } from "../boost";

const fieldsMapper = {
	abstract: [availableFieldEnum["abstract.stemmed"]],
	title: [availableFieldEnum["title.stemmed"]],
	keywords: [availableFieldEnum.keywords],
	allField: undefined,
} as const satisfies Record<TextFieldEnumValue, AvailableField[] | undefined>;

const allFieldValue = Object
	.values(fieldsMapper)
	.flatMap(
		(fields) => fields
			? fields
			: [],
	);

const truncationWordRegex = /[a-z]+\*/gi;
const minTruncationLength = 3;

export function buildTextComparator(
	comparatorText: ComparatorText,
): estypes.QueryDslQueryContainer {
	const fields = (fieldsMapper[comparatorText.field] ?? allFieldValue)
		.map((field) => formatFieldWithBoost(
			field,
			comparatorText.boost,
		));

	const truncationWords = Array.from(
		comparatorText.value.matchAll(truncationWordRegex),
	);

	if (truncationWords.length) {
		const refinedTerm = truncationWords.reduce(
			(acc, [match]) => acc.replace(match, ""),
			comparatorText.value,
		);

		return {
			bool: {
				should: [
					{
						multi_match: {
							query: refinedTerm,
							fields,
						},
					},
					...truncationWords.flatMap(
						([match]) => match.length > minTruncationLength
							? {
								query_string: {
									query: match,
									fields,
								},
							} satisfies estypes.QueryDslQueryContainer
							: [],
					),
				],
				minimum_should_match: 1,
			},
		};
	}

	return {
		multi_match: {
			query: comparatorText.value,
			fields,
		},
	};
}

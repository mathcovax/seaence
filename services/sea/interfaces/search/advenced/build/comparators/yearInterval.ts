import { type estypes } from "@elastic/elasticsearch";
import { type AvailableField, availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type YearFieldEnumValue, type ComparatorYearInterval } from "@vendors/types-advanced-query";
import { formatFieldWithBoost } from "../boost";

const fieldsMapper = {
	webDate: availableFieldEnum["webPublishSplitDate.year"],
	journalDate: availableFieldEnum["journalPublishSplitDate.year"],
	allDate: undefined,
} as const satisfies Record<YearFieldEnumValue, AvailableField | undefined>;

export function buildYearIntervalComparator(
	comparatorYearInterval: ComparatorYearInterval,
): estypes.QueryDslQueryContainer {
	const fields = fieldsMapper[comparatorYearInterval.field];

	const { from, to } = comparatorYearInterval.value;

	if (!fields) {
		const journalPublishDateYear = formatFieldWithBoost(
			availableFieldEnum["journalPublishSplitDate.year"],
			comparatorYearInterval.boost,
		);

		const webPublishDateYear = formatFieldWithBoost(
			availableFieldEnum["webPublishSplitDate.year"],
			comparatorYearInterval.boost,
		);

		return {
			bool: {
				should: [
					{
						range: {
							[journalPublishDateYear]: {
								gte: from,
								lte: to,
							},
						},
					},
					{
						bool: {
							must_not: {
								exists: {
									field: availableFieldEnum.journalPublishSplitDate,
								},
							},
							must: {
								range: {
									[webPublishDateYear]: {
										gte: from,
										lte: to,
									},
								},
							},
						},
					},
				],
				minimum_should_match: 1,
			},
		};
	}

	const formatedField = formatFieldWithBoost(
		fields,
		comparatorYearInterval.boost,
	);

	return {
		range: {
			[formatedField]: {
				gte: from,
				lte: to,
			},
		},
	};
}

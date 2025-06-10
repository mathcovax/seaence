import { type estypes } from "@elastic/elasticsearch";
import { type AvailableField, availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { type YearFieldEnumValue, type ComparatorYearInterval } from "@vendors/types-advanced-query";

const fieldsMapper: Record<YearFieldEnumValue, AvailableField | undefined> = {
	webDate: availableFieldEnum["webPublishSplitDate.year"],
	journalDate: availableFieldEnum["journalPublishSplitDate.year"],
	allDate: undefined,
};

export function buildYearIntervalComparator(
	comparatorYearInterval: ComparatorYearInterval,
): estypes.QueryDslQueryContainer {
	const fields = fieldsMapper[comparatorYearInterval.field];

	const { from, to } = comparatorYearInterval.value;

	if (!fields) {
		return {
			bool: {
				should: [
					{
						range: {
							[availableFieldEnum["journalPublishSplitDate.year"]]: {
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
									[availableFieldEnum["webPublishSplitDate.year"]]: {
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

	return {
		range: {
			[fields]: {
				gte: from,
				lte: to,
			},
		},
	};
}

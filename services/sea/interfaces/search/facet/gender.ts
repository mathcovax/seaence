import { type Language } from "@interfaces/providers/elastic/common/language";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import { type Facet, type AggregationResult, type FacetValue } from ".";
import { type estypes } from "@elastic/elasticsearch";
import { StringArrayRegexed } from "@interfaces/utils/stringArrayRegexed";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";

export const genderEnum = createEnum(["male", "female"]);

export type Gender = GetEnumValue<typeof genderEnum>;

export type GenderFacetValue = Record<Gender, StringArrayRegexed>;

export const languageToGenderFacetValue: Record<Language, GenderFacetValue> = {
	"fr-FR": {
		male: new StringArrayRegexed("Hommes", "Homme", "hommes", "homme"),
		female: new StringArrayRegexed("Femmes", "Femme", "femmes", "femme"),
	},
	"en-US": {
		male: new StringArrayRegexed("Males", "Male", "males", "male"),
		female: new StringArrayRegexed("Females", "Female", "females", "female"),
	},
};

export interface GenderAggregationsResults {
	genderResult: {
		genderFilteredResult: AggregationResult<string>;
	};
}

export function buildGenderAggregation(language: Language) {
	const genderFacetValue = [
		...languageToGenderFacetValue[language].male,
		...languageToGenderFacetValue[language].female,
	];

	return {
		filter: {
			terms: {
				[availableFieldEnum["keywords.keyword"]]: genderFacetValue,
			},
		},
		aggregations: {
			genderFilteredResult: {
				terms: {
					field: availableFieldEnum["keywords.keyword"],
					include: genderFacetValue,
				},
			},
		} satisfies Record<keyof GenderAggregationsResults["genderResult"], estypes.AggregationsAggregationContainer>,
	} satisfies estypes.AggregationsAggregationContainer;
}

export type GenderFacet = Facet<
	"gender",
	FacetValue<Gender>
>;

const defaltAccGender = 0;

function computeGenderFacet(
	gender: Gender,
	genderFacetValue: GenderFacetValue,
	genderResult: GenderAggregationsResults["genderResult"],
): GenderFacet["values"] {
	const quantity = genderResult.genderFilteredResult.buckets
		.filter(
			(value) => genderFacetValue[gender].regex.test(value.key),
		)
		.reduce(
			(acc, { doc_count }) => acc + doc_count,
			defaltAccGender,
		);

	if (quantity) {
		return [
			{
				value: gender,
				quantity,
			},
		];
	} else {
		return [];
	}
}

export function genderAggregationResultsToFacet(
	language: Language,
	genderResult: GenderAggregationsResults["genderResult"],
): GenderFacet | null {
	const values = [
		...computeGenderFacet("female", languageToGenderFacetValue[language], genderResult),
		...computeGenderFacet("male", languageToGenderFacetValue[language], genderResult),
	];

	if (!values.length) {
		return null;
	}

	return {
		name: "gender",
		values,
	};
}

export interface GenderFilterValues {
	gender?: Gender[];
}

export function buildGenderFilter(
	language: Language,
	genderFilterValues: GenderFilterValues["gender"],
) {
	if (genderFilterValues) {
		return [
			{
				__id: "genderFilter",
				terms: {
					[availableFieldEnum["keywords.keyword"]]: genderFilterValues
						.flatMap(
							(gender) => languageToGenderFacetValue[language][gender],
						),
				},
			},
		] satisfies (estypes.QueryDslQueryContainer & { __id: "genderFilter" })[];
	} else {
		return [];
	}
}

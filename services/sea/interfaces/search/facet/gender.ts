import { type Language } from "@interfaces/providers/elastic/common/language";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import { type Facet, type AggregationResult } from ".";
import { type estypes } from "@elastic/elasticsearch";
import { FacetValues } from "@interfaces/utils/facetValues";

export const genderEnum = createEnum(["male", "female"]);

export type Gender = GetEnumValue<typeof genderEnum>;

export type GenderFacetValue = Record<Gender, FacetValues>;

export const languageToGenderFacetValue: Record<Language, GenderFacetValue> = {
	"fr-FR": {
		male: new FacetValues("Hommes", "Homme", "hommes", "homme"),
		female: new FacetValues("Femmes", "Femme", "femmes", "femme"),
	},
	"en-US": {
		male: new FacetValues("Males", "Male", "males", "male"),
		female: new FacetValues("Females", "Female", "females", "female"),
	},
};

export interface GenderAggregationsResults {
	genderResult: {
		genderFilteredResult: AggregationResult<string>;
	};
}

export function getGenderAggregation(language: Language) {
	const genderFacetValue = [
		...languageToGenderFacetValue[language].male,
		...languageToGenderFacetValue[language].female,
	];

	return {
		filter: {
			terms: {
				"keywords.keyword": genderFacetValue,
			},
		},
		aggregations: {
			genderFilteredResult: {
				terms: {
					field: "keywords.keyword",
					include: genderFacetValue,
				},
			},
		} satisfies Record<keyof GenderAggregationsResults["genderResult"], estypes.AggregationsAggregationContainer>,
	} satisfies estypes.AggregationsAggregationContainer;
}

const defaltAccGender = 0;

function computeGenderFacet(
	gender: Gender,
	genderFacetValue: GenderFacetValue,
	genderResult: GenderAggregationsResults["genderResult"],
): Facet<Gender>[] {
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
): Facet<Gender>[] {
	return [
		...computeGenderFacet("female", languageToGenderFacetValue[language], genderResult),
		...computeGenderFacet("male", languageToGenderFacetValue[language], genderResult),
	];
}

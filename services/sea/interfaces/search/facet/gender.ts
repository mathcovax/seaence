import { type Language } from "@interfaces/providers/elastic/common/language";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import { type Facet, type FacetValue, type AggregationWrappedBucketsResult } from ".";
import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { getTypedEntries } from "@duplojs/utils";

export const genderEnum = createEnum(["male", "female"]);

export type Gender = GetEnumValue<typeof genderEnum>;

export type GenderFacetValue = Record<Gender, string[]>;

export const languageToGenderFacetValue: Record<Language, GenderFacetValue> = {
	"fr-FR": {
		male: ["Hommes", "Homme", "hommes", "homme"],
		female: ["Femmes", "Femme", "femmes", "femme"],
	},
	"en-US": {
		male: ["Males", "Male", "males", "male"],
		female: ["Females", "Female", "females", "female"],
	},
};

export interface GenderAggregationsResults {
	genderResult: AggregationWrappedBucketsResult<Gender>;
}

export function buildGenderAggregation(language: Language) {
	return {
		filters: {
			filters: getTypedEntries(languageToGenderFacetValue[language])
				.reduce<Partial<Record<Gender, estypes.QueryDslQueryContainer>>>(
					(acc, [key, value]) => {
						acc[key] = {
							terms: {
								[availableFieldEnum["keywords.keyword"]]: value,
							},
						};
						return acc;
					},
					{},
				),
		},
	} satisfies estypes.AggregationsAggregationContainer;
}

export type GenderFacet = Facet<
	"gender",
	FacetValue<Gender>
>;

function computeGenderFacet(
	gender: Gender,
	genderResult: GenderAggregationsResults["genderResult"],
): GenderFacet["values"] {
	return [
		{
			value: gender,
			quantity: genderResult.buckets[gender].doc_count,
		},
	];
}

export function genderAggregationResultsToFacet(
	genderResult: GenderAggregationsResults["genderResult"],
): GenderFacet {
	return {
		name: "gender",
		values: genderEnum
			.toTuple()
			.map((value) => ({
				value,
				quantity: genderResult.buckets[value].doc_count,
			})),
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

import { type Language } from "@interfaces/providers/elastic/common/language";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import { type Facet, type FacetValue, type AggregationWrappedBucketsResult } from ".";
import { type estypes } from "@elastic/elasticsearch";
import { availableFieldEnum } from "@interfaces/providers/elastic/indexes/document";
import { getTypedEntries } from "@duplojs/utils";

export const speciesEnum = createEnum(["human", "otherAnimal"]);

export type Species = GetEnumValue<typeof speciesEnum>;

export type SpeciesFacetValue = Record<Species, string[]>;

export const languageToSpeciesFacetValue: Record<Language, SpeciesFacetValue> = {
	"fr-FR": {
		human: ["Humains", "Humain", "humains", "humain"],
		otherAnimal: ["Animaux", "Animal", "animaux", "animal"],
	},
	"en-US": {
		human: ["Humans", "Human", "humans", "human"],
		otherAnimal: ["Animals", "Animal", "animals", "animal"],
	},
};

export interface SpeciesAggregationsResults {
	speciesResult: AggregationWrappedBucketsResult<Species>;
}

export function buildSpeciesAggregation(language: Language) {
	return {
		filters: {
			filters: getTypedEntries(languageToSpeciesFacetValue[language])
				.reduce<Partial<Record<Species, estypes.QueryDslQueryContainer>>>(
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

export type SpeciesFacet = Facet<
	"species",
	FacetValue<Species>
>;

function computeSpeciesFacet(
	species: Species,
	speciesResult: SpeciesAggregationsResults["speciesResult"],
): SpeciesFacet["values"] {
	if (speciesResult.buckets[species].doc_count) {
		return [
			{
				value: species,
				quantity: speciesResult.buckets[species].doc_count,
			},
		];
	} else {
		return [];
	}
}

export function speciesAggregationResultsToFacet(
	speciesResult: SpeciesAggregationsResults["speciesResult"],
): SpeciesFacet | null {
	const values = [
		...computeSpeciesFacet("human", speciesResult),
		...computeSpeciesFacet("otherAnimal", speciesResult),
	];

	if (!values.length) {
		return null;
	}

	return {
		name: "species",
		values,
	};
}

export interface SpeciesFilterValues {
	species?: Species[];
}

export function buildSpeciesFilter(
	language: Language,
	speciesFilterValues: SpeciesFilterValues["species"],
) {
	if (speciesFilterValues) {
		return [
			{
				__id: "speciesFilter",
				terms: {
					[availableFieldEnum["keywords.keyword"]]: speciesFilterValues
						.flatMap(
							(species) => languageToSpeciesFacetValue[language][species],
						),
				},
			},
		] satisfies (estypes.QueryDslQueryContainer & { __id: "speciesFilter" })[];
	} else {
		return [];
	}
}

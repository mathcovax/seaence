import { type Language } from "@interfaces/providers/elastic/common/language";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import { type Facet, type AggregationResult } from ".";
import { type estypes } from "@elastic/elasticsearch";
import { FacetValues } from "@interfaces/utils/facetValues";

export const speciesEnum = createEnum(["human", "otherAnimal"]);

export type Species = GetEnumValue<typeof speciesEnum>;

export type SpeciesFacetValue = Record<Species, FacetValues>;

export const languageToSpeciesFacetValue: Record<Language, SpeciesFacetValue> = {
	"fr-FR": {
		human: new FacetValues("Humains", "Humain", "humains", "humain"),
		otherAnimal: new FacetValues("Animaux", "Animal", "animaux", "animal"),
	},
	"en-US": {
		human: new FacetValues("Humans", "Human", "humans", "human"),
		otherAnimal: new FacetValues("Animals", "Animal", "animals", "animal"),
	},
};

export interface SpeciesAggregationsResults {
	speciesResult: {
		speciesFilteredResult: AggregationResult<string>;
	};
}

export function buildSpeciesAggregation(language: Language) {
	const speciesFacetValue = [
		...languageToSpeciesFacetValue[language].human,
		...languageToSpeciesFacetValue[language].otherAnimal,
	];

	return {
		filter: {
			terms: {
				"keywords.keyword": speciesFacetValue,
			},
		},
		aggregations: {
			speciesFilteredResult: {
				terms: {
					field: "keywords.keyword",
					include: speciesFacetValue,
				},
			},
		} satisfies Record<keyof SpeciesAggregationsResults["speciesResult"], estypes.AggregationsAggregationContainer>,
	} satisfies estypes.AggregationsAggregationContainer;
}

const defaltAccSpecies = 0;

function computeSpeciesFacet(
	species: Species,
	speciesFacetValue: SpeciesFacetValue,
	speciesResult: SpeciesAggregationsResults["speciesResult"],
): Facet<Species>[] {
	const quantity = speciesResult.speciesFilteredResult.buckets
		.filter(
			(value) => speciesFacetValue[species].regex.test(value.key),
		)
		.reduce(
			(acc, { doc_count }) => acc + doc_count,
			defaltAccSpecies,
		);

	if (quantity) {
		return [
			{
				value: species,
				quantity,
			},
		];
	} else {
		return [];
	}
}

export function speciesAggregationResultsToFacet(
	language: Language,
	speciesResult: SpeciesAggregationsResults["speciesResult"],
): Facet<Species>[] {
	return [
		...computeSpeciesFacet("human", languageToSpeciesFacetValue[language], speciesResult),
		...computeSpeciesFacet("otherAnimal", languageToSpeciesFacetValue[language], speciesResult),
	];
}

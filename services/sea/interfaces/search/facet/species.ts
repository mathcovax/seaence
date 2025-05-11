import { type Language } from "@interfaces/providers/elastic/common/language";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import { type Facet, type AggregationResult, type FacetValue } from ".";
import { type estypes } from "@elastic/elasticsearch";
import { StringArrayRegexed } from "@interfaces/utils/stringArrayRegexed";

export const speciesEnum = createEnum(["human", "otherAnimal"]);

export type Species = GetEnumValue<typeof speciesEnum>;

export type SpeciesFacetValue = Record<Species, StringArrayRegexed>;

export const languageToSpeciesFacetValue: Record<Language, SpeciesFacetValue> = {
	"fr-FR": {
		human: new StringArrayRegexed("Humains", "Humain", "humains", "humain"),
		otherAnimal: new StringArrayRegexed("Animaux", "Animal", "animaux", "animal"),
	},
	"en-US": {
		human: new StringArrayRegexed("Humans", "Human", "humans", "human"),
		otherAnimal: new StringArrayRegexed("Animals", "Animal", "animals", "animal"),
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

export type SpeciesFacet = Facet<
	"species",
	FacetValue<Species>
>;

const defaltAccSpecies = 0;

function computeSpeciesFacet(
	species: Species,
	speciesFacetValue: SpeciesFacetValue,
	speciesResult: SpeciesAggregationsResults["speciesResult"],
): SpeciesFacet["values"] {
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
): SpeciesFacet | null {
	const values = [
		...computeSpeciesFacet("human", languageToSpeciesFacetValue[language], speciesResult),
		...computeSpeciesFacet("otherAnimal", languageToSpeciesFacetValue[language], speciesResult),
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
					"keywords.keyword": speciesFilterValues.flatMap(
						(species) => languageToSpeciesFacetValue[language][species],
					),
				},
			},
		] satisfies (estypes.QueryDslQueryContainer & { __id: "speciesFilter" })[];
	} else {
		return [];
	}
}

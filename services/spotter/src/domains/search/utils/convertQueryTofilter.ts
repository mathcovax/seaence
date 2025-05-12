import type {
	ArticleType,
	FiltersValues,
	GenderFacetValue,
	SpeciesFacetValue,
} from "@vendors/clients-type/horizon/duplojsTypesCodegen";

export interface QueryFilters {
	articleType?: ArticleType[];
	gender?: GenderFacetValue[];
	species?: SpeciesFacetValue[];
	year?: [number, number];
}

const queryYearIndex = {
	from: 0,
	to: 1,
};

export function convertQueryTofilter(query: QueryFilters): FiltersValues {
	return {
		articleType: query.articleType,
		gender: query.gender,
		species: query.species,
		year: query.year && {
			from: query.year[queryYearIndex.from],
			to: query.year[queryYearIndex.to],
		},
	};
}

export function convertFiltersToQuery(filtersValues: FiltersValues): QueryFilters {
	return {
		articleType: filtersValues.articleType,
		gender: filtersValues.gender,
		species: filtersValues.species,
		year: filtersValues.year && [
			filtersValues.year.from,
			filtersValues.year.to,
		],
	};
}

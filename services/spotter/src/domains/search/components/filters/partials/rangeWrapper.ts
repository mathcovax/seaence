import type { Facet, FiltersValues } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import RangeFilter from "./RangeFilter.vue";

const defaultModelValue = {
	from: 0,
	to: 0,
};

export function rangeWrapper(
	facet: Extract<Facet, { type: "range" }>,
	ref: Ref<FiltersValues>,
) {
	return h(
		RangeFilter<typeof facet>,
		{
			facet,
			modelValue: ref.value[facet.name] ?? defaultModelValue,
			"onUpdate:modelValue": (value) => {
				ref.value[facet.name] = value;
			},
		},
	);
}

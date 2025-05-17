import type { Facet, FiltersValues } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { match } from "ts-pattern";
import MultiSelectFilter from "./MultiSelectFilter.vue";

export function multiSelectWrapper(
	facet: Extract<Facet, { type: "multiSelect" }>,
	ref: Ref<FiltersValues>,
) {
	return match(facet)
		.with(
			{ name: "articleType" },
			(facet) => h(
				MultiSelectFilter<typeof facet>,
				{
					facet,
					modelValue: ref.value[facet.name] ?? [],
					"onUpdate:modelValue": (value) => {
						if (value.length) {
							ref.value[facet.name] = value;
						} else {
							ref.value[facet.name] = undefined;
						}
					},
				},
			),
		)
		.exhaustive();
}

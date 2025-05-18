import type { Facet, FiltersValues } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { match } from "ts-pattern";
import CheckboxFilter from "./CheckboxFilter.vue";

export function checkboxWrapper(
	facet: Extract<Facet, { type: "checkbox" }>,
	ref: Ref<FiltersValues>,
) {
	return match(facet)
		.with(
			{ name: "gender" },
			(facet) => h(
				CheckboxFilter<typeof facet>,
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
		.with(
			{ name: "species" },
			(facet) => h(
				CheckboxFilter<typeof facet>,
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

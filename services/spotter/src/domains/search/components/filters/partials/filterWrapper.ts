import type { Facet, FiltersValues } from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import { match } from "ts-pattern";
import { checkboxWrapper } from "./checkboxWrapper";
import { rangeWrapper } from "./rangeWrapper";
import { multiSelectWrapper } from "./multiSelectWrapper";

export function filterWrapper(
	facet: Facet,
	ref: Ref<FiltersValues>,
) {
	return match(facet)
		.with(
			{ type: "checkbox" },
			(facet) => checkboxWrapper(facet, ref),
		)
		.with(
			{ type: "range" },
			(facet) => rangeWrapper(facet, ref),
		)
		.with(
			{ type: "multiSelect" },
			(facet) => multiSelectWrapper(facet, ref),
		)
		.exhaustive();
}

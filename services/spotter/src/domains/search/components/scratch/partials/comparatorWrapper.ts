import { match } from "ts-pattern";
import ComparatorText from "./comparator/ComparatorText.vue";
import ComparatorYear from "./comparator/ComparatorYear.vue";
import type { OperatorContentEvent } from "./operatorContentWrapper";
import type { Comparator } from "@vendors/scratch-type";

export function comparatorWrapper(
	comparator: Comparator,
	events: OperatorContentEvent,
) {
	return match(comparator)
		.with(
			{ name: "text" },
			(comparator) => h(
				ComparatorText,
				{
					modelValue: comparator,
					"onUpdate:modelValue": events.onUpdate,
					onRemove: events.remove,
				},
			),
		)
		.with(
			{ name: "year" },
			(comparator) => h(
				ComparatorYear,
				{
					modelValue: comparator,
					"onUpdate:modelValue": events.onUpdate,
					onRemove: events.remove,
				},
			),
		)
		.exhaustive();
}

import { match, P } from "ts-pattern";
import OperatorAndOr from "./operator/OperatorAndOr.vue";
import OperatorNot from "./operator/OperatorNot.vue";
import type { OperatorContentEvent } from "./operatorContentWrapper";
import type { Operator } from "@vendors/types-advanced-query";

export function operatorWrapper(
	operator: Operator,
	events: OperatorContentEvent,
) {
	return match(operator)
		.with(
			{ name: P.union("and", "or") },
			(operator) => h(
				OperatorAndOr,
				{
					modelValue: operator,
					"onUpdate:modelValue": events.onUpdate,
					onRemove: events.remove,
				},
			),
		)
		.with(
			{ name: "not" },
			(operator) => h(
				OperatorNot,
				{
					modelValue: operator,
					"onUpdate:modelValue": events.onUpdate,
					onRemove: events.remove,
				},
			),
		)
		.exhaustive();
}

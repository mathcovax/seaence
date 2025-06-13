import { match } from "ts-pattern";
import ComparatorText from "./comparator/ComparatorText.vue";
import ComparatorYear from "./comparator/ComparatorYear.vue";
import type { OperatorContentEvent } from "./operatorContentWrapper";
import type { Comparator } from "@vendors/types-advanced-query";
import ComparatorStrictText from "./comparator/ComparatorStrictText.vue";
import ComparatorAuthor from "./comparator/ComparatorAuthor.vue";
import ComparatorArticleType from "./comparator/ComparatorArticleType.vue";
import ComparatorProvider from "./comparator/ComparatorProvider.vue";
import ComparatorYearInterval from "./comparator/ComparatorYearInterval.vue";

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
		.with(
			{ name: "strictText" },
			(comparator) => h(
				ComparatorStrictText,
				{
					modelValue: comparator,
					"onUpdate:modelValue": events.onUpdate,
					onRemove: events.remove,
				},
			),
		)
		.with(
			{ name: "author" },
			(comparator) => h(
				ComparatorAuthor,
				{
					modelValue: comparator,
					"onUpdate:modelValue": events.onUpdate,
					onRemove: events.remove,
				},
			),
		)
		.with(
			{ name: "articleType" },
			(comparator) => h(
				ComparatorArticleType,
				{
					modelValue: comparator,
					"onUpdate:modelValue": events.onUpdate,
					onRemove: events.remove,
				},
			),
		)
		.with(
			{ name: "provider" },
			(comparator) => h(
				ComparatorProvider,
				{
					modelValue: comparator,
					"onUpdate:modelValue": events.onUpdate,
					onRemove: events.remove,
				},
			),
		)
		.with(
			{ name: "yearInterval" },
			(comparator) => h(
				ComparatorYearInterval,
				{
					modelValue: comparator,
					"onUpdate:modelValue": events.onUpdate,
					onRemove: events.remove,
				},
			),
		)
		.exhaustive();
}

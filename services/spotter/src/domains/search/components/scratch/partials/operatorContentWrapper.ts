import { match } from "ts-pattern";
import { comparatorWrapper } from "./comparatorWrapper";
import { operatorWrapper } from "./operatorWrapper";
import type { OperatorContent } from "@vendors/types-advanced-query";

export interface OperatorContentEvent {
	onUpdate(value: OperatorContent): void;
	remove(): void;
}

export function operatorContentWrapper(
	operatorContent: OperatorContent,
	events: OperatorContentEvent,
) {
	return match(operatorContent)
		.with(
			{ type: "comparator" },
			(content) => comparatorWrapper(
				content,
				events,
			),
		)
		.with(
			{ type: "operator" },
			(content) => operatorWrapper(
				content,
				events,
			),
		)
		.exhaustive();
}

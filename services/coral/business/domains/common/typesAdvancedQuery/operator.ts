/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @stylistic/js/implicit-arrow-linebreak */
import { DPE } from "@duplojs/utils";
import { type Comparator, comparatorSchema } from "./comparator";

export type OperatorContent =
	| Comparator
	| Operator;

export interface BaseOperator<
	GenericName extends string,
> {
	type: "operator";
	name: GenericName;
}

export const operatorConfig = {
	maxContent: 10,
	minContent: 1,
} as const;

export interface OperatorAnd extends BaseOperator<"and"> {
	content: OperatorContent[];
}

export interface OperatorOr extends BaseOperator<"or"> {
	content: OperatorContent[];
}

export interface OperatorNot extends BaseOperator<"not"> {
	content: OperatorContent | null;
}

export type Operator =
	| OperatorAnd
	| OperatorOr
	| OperatorNot;

export const operatorContentSchema: DPE.DataParserExtended<OperatorContent> = DPE.lazy(
	() =>
		DPE.union([
			operatorAndSchema,
			operatorNotSchema,
			operatorOrSchema,
			...comparatorSchema.definition.options,
		]),
).contractExtended();

export const operatorAndSchema = DPE.object({
	type: DPE.literal("operator"),
	name: DPE.literal("and"),
	content: operatorContentSchema
		.array()
		.max(operatorConfig.maxContent)
		.min(operatorConfig.minContent),
});

export const operatorOrSchema = DPE.object({
	type: DPE.literal("operator"),
	name: DPE.literal("or"),
	content: operatorContentSchema
		.array()
		.max(operatorConfig.maxContent)
		.min(operatorConfig.minContent),
});

export const operatorNotSchema = DPE.object({
	type: DPE.literal("operator"),
	name: DPE.literal("not"),
	content: operatorContentSchema.nullable(),
});

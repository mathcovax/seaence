import { type ZodType } from "zod";
import { zod } from "@vendors/clean";
import { comparatorSchema, type Comparator } from "./comparator";

export type OperatorContent =
	| Comparator
	| Operator;

export interface BaseOperator<
	GenericName extends string,
> {
	type: "operator";
	name: GenericName;
}

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

export const operatorContentSchema = zod.lazy(
	() => zod.union([
		operatorAndSchema,
		operatorOrSchema,
		operatorNotSchema,
		...comparatorSchema.options,
	]),
);

export const operatorAndSchema: ZodType<OperatorAnd> = zod.object({
	type: zod.literal("operator"),
	name: zod.literal("and"),
	content: operatorContentSchema.array().max(10).min(1),
});

export const operatorOrSchema: ZodType<OperatorOr> = zod.object({
	type: zod.literal("operator"),
	name: zod.literal("or"),
	content: operatorContentSchema.array().max(10).min(1),
});

export const operatorNotSchema: ZodType<OperatorNot> = zod.object({
	type: zod.literal("operator"),
	name: zod.literal("not"),
	content: operatorContentSchema,

});

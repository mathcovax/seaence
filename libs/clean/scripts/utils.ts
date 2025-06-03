import { type MybePromise, type AnyFunction, type SimplifyObjectTopLevel, hasKey } from "@duplojs/utils";
import { type ValueObject, type ValueObjecterAttribute, type ValueObjectError } from "./valueObject";
import { type ZodType } from "zod";

export type AnyRecord = Record<any, any>;

export function setProperty(object: any, prop: string, value: any) {
	(object as AnyRecord)[prop] = value;
}

export type ToJSON<
	GenericValue extends unknown,
> = GenericValue extends number | string | null | undefined
	? GenericValue
	: GenericValue extends ({ toJSON: AnyFunction })
		? ReturnType<GenericValue["toJSON"]>
		: GenericValue extends [infer InferedFirst, ...infer InferedRest]
			? [
				ToJSON<InferedFirst>,
				...(
					ToJSON<InferedRest> extends [
						infer InferedSubFirst,
						...infer InferedSubRest,
					]
						? [InferedSubFirst, ...InferedSubRest]
						: []
				),
			]
			: GenericValue extends any[]
				? ToJSON<GenericValue[number]>[]
				: GenericValue extends Record<number, unknown>
					? {
						[
						Prop in keyof GenericValue as GenericValue[Prop] extends AnyFunction
							? never
							: Prop
						]: ToJSON<GenericValue[Prop]>
					}
					: undefined;

export function toJSON<
	GenericValue extends unknown,
>(
	value: GenericValue,
): ToJSON<GenericValue> {
	if (
		typeof value === "string"
		|| typeof value === "number"
		|| value === null
		|| value === undefined
	) {
		return value as never;
	} else if (
		typeof value === "object"
		&& "toJSON" in value
		&& typeof value.toJSON === "function"
	) {
		return (value.toJSON as AnyFunction)();
	} else if (
		typeof value === "object"
		&& (
			!value.constructor
			|| value.constructor.name === "Object"

		)
	) {
		return Object.entries(value).reduce(
			(pv, [key, value]) => ({
				...pv,
				[key]: toJSON(value),
			}),
			{},
		) as never;
	} else if (
		value instanceof Array
		&& value.constructor.name === "Array"
	) {
		return value.map(toJSON) as never;
	} else {
		return undefined as never;
	}
}

export type ToSimpleObject<
	GenericValue extends unknown,
> = GenericValue extends number | string | null | undefined
	? GenericValue
	: GenericValue extends ({ toSimpleObject: AnyFunction })
		? ReturnType<GenericValue["toSimpleObject"]>
		: GenericValue extends [infer InferedFirst, ...infer InferedRest]
			? [
				ToSimpleObject<InferedFirst>,
				...(
					ToSimpleObject<InferedRest> extends [
						infer InferedSubFirst,
						...infer InferedSubRest,
					]
						? [InferedSubFirst, ...InferedSubRest]
						: []
				),
			]
			: GenericValue extends any[]
				? ToSimpleObject<GenericValue[number]>[]
				: GenericValue extends Record<number, unknown>
					? {
						[Prop in keyof GenericValue]: ToSimpleObject<GenericValue[Prop]>
					}
					: GenericValue;

export function toSimpleObject<
	GenericValue extends unknown,
>(
	value: GenericValue,
): ToSimpleObject<GenericValue> {
	if (
		typeof value === "string"
		|| typeof value === "number"
		|| value === null
		|| value === undefined
	) {
		return value as never;
	} else if (
		value
		&& typeof value === "object"
		&& "toSimpleObject" in value
		&& typeof value.toSimpleObject === "function"
	) {
		return (
			(value.toSimpleObject as AnyFunction)()
		) as never;
	} else if (
		typeof value === "object"
		&& (
			!value.constructor
			|| value.constructor.name === "Object"

		)
	) {
		return Object.entries(value).reduce(
			(pv, [key, value]) => ({
				...pv,
				[key]: toSimpleObject<unknown>(value),
			}),
			{},
		) as never;
	} else if (
		value instanceof Array
		&& value.constructor.name === "Array"
	) {
		return value.map((subValue) => toSimpleObject<unknown>(subValue)) as never;
	} else {
		return value as never;
	}
}

declare const BrandCleanEnumSymbol: unique symbol;

export type BrandCleanEnumValue<
	GenericValues extends unknown,
> = GenericValues & { [BrandCleanEnumSymbol]: boolean };

export type BrandCleanEnumTuple<
	GenericValues extends unknown[],
> = GenericValues extends [infer InferedValue, ...infer InferedRest]
	? [
		BrandCleanEnumValue<InferedValue>,
		...BrandCleanEnumTuple<InferedRest>,
	]
	: GenericValues extends []
		? GenericValues
		: never;

export type CleanEnum<
	GenericValues extends [string, ...string[]] = [string, ...string[]],
> = SimplifyObjectTopLevel<
	{
		[Prop in GenericValues[number]]: Prop
	} & {
		toTuple(): GenericValues;
		has(value: string): value is GenericValues[number];
	}
>;

export function createEnum<
	GenericValue extends string,
	GenericValues extends [GenericValue, ...GenericValue[]],
>(values: GenericValues): CleanEnum<GenericValues> {
	return Object.fromEntries(
		[
			...values.map((value) => [value, value]),
			["toTuple", () => values],
			["has", (value: GenericValue) => values.includes(value)],
		],
	);
}

export type GetEnumValue<
	GenericEnum extends CleanEnum<any>,
> = ReturnType<GenericEnum["toTuple"]>[number];

export type MybeArray<
	GenericValue extends unknown,
> = GenericValue | GenericValue[];

export class AttributeError<
	GenericName extends string = string,
> extends Error {
	public constructor(
		public readonly valueObjectName: GenericName,
		public readonly attribute: ValueObjecterAttribute,
	) {
		super(`${attribute} attribute Error on ${valueObjectName} value object.`);
	}
}

export type ApplyValueObjecterAttribute<
	GenericValue extends unknown,
	GenericValueObjecterAttribute extends unknown[],
> = GenericValueObjecterAttribute extends [...unknown[], infer InferedLast]
	? InferedLast extends "array"
		? GenericValueObjecterAttribute extends [...infer InferedRest, unknown]
			? ApplyValueObjecterAttribute<GenericValue[], InferedRest>
			: never
		: InferedLast extends "nullable"
			? GenericValueObjecterAttribute extends [...infer InferedRest, unknown]
				? ApplyValueObjecterAttribute<null | GenericValue, InferedRest>
				: never
			: never
	: GenericValue;

export function applyAttributes(
	getValue: (rawValue: any) => ValueObject | ValueObjectError,
	valueObjecterName: string,
	rawValue: any,
	attributes: ValueObjecterAttribute[],
): MybeArray<
	| ValueObject
	| AttributeError
	| ValueObjectError
	| null
	> {
	const [currentAttribute, ...restAttributes] = attributes;

	if (currentAttribute === undefined) {
		return getValue(rawValue);
	} else if (currentAttribute === "nullable") {
		return rawValue === null
			? null
			: applyAttributes(
				getValue,
				valueObjecterName,
				rawValue,
				restAttributes,
			);
	} else if (currentAttribute === "array") {
		if (!Array.isArray(rawValue)) {
			return new AttributeError(
				valueObjecterName,
				currentAttribute,
			);
		}

		const results = rawValue.map(
			(mappedRawValue) => applyAttributes(
				getValue,
				valueObjecterName,
				mappedRawValue,
				restAttributes,
			),
		);

		return results.find((result) => result instanceof Error) ?? results as never;
	} else {
		return new AttributeError(
			valueObjecterName,
			currentAttribute,
		);
	}
}

export function applyAttributesToZodSchema(
	attributes: ValueObjecterAttribute[],
	zodSchema: ZodType,
): ZodType {
	return attributes
		.reduceRight<ZodType>(
			(pv, cv) => {
				if (cv === "array") {
					return pv.array();
				} else if (cv === "nullable") {
					return pv.nullable();
				}
				return pv;
			},
			zodSchema,
		);
}

export type AwaitedPromiseObject<
	GenericObject extends Record<string, MybePromise<unknown>>,
> = {
	[Prop in keyof GenericObject]: Awaited<GenericObject[Prop]>
};

export function promiseObject<
	GenericObject extends Record<string, MybePromise<unknown>>,
>(object: GenericObject) {
	return Promise
		.all(
			Object.entries(object)
				.map<MybePromise<[string, unknown]>>(
					([key, promisedValue]) => promisedValue instanceof Promise
						? promisedValue.then((value) => [key, value])
						: [key, promisedValue],
				),
		)
		.then(
			(entries) => Object.fromEntries(entries) as SimplifyObjectTopLevel<AwaitedPromiseObject<GenericObject>>,
		);
}

import { type AnyFunction, type SimplifyObjectTopLevel } from "@duplojs/utils";

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
	GenericValues extends [string, ...string[]],
> = SimplifyObjectTopLevel<
	{
		[Prop in GenericValues[number]]: Prop
	} & {
		toTuple(): GenericValues;
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
		],
	);
}

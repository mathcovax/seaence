import { type AnyFunction } from "@duplojs/utils";

export type ToJSON<
	GenericValue extends unknown,
> = GenericValue extends number | string | null | undefined
	? GenericValue
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
				: GenericValue extends ({ toJSON(...args: any[]): any })
					? ReturnType<GenericValue["toJSON"]>
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
		return (
			typeof value === "object"
			&& "toJSON" in value
			&& typeof value.toJSON === "function"
				? (value.toJSON as AnyFunction)()
				: undefined
		) as never;
	}
}

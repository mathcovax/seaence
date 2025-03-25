import { type AnyFunction } from "@duplojs/utils";
import { type UsecaseHandler } from "./usecase";

export type ToJSON<
	GenericValue extends unknown,
> = GenericValue extends number | string | null | undefined
	? GenericValue
	: GenericValue extends Record<number, unknown>
		? {
			[Prop in keyof GenericValue]: ToJSON<GenericValue[Prop]>
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

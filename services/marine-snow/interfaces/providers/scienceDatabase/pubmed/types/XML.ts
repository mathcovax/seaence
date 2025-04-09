import { type SimplifyObjectTopLevel, type UnionToIntersection } from "@duplojs/utils";
import { type ZodObject, z as zod, type ZodType, type infer as zInfer } from "zod";

export type XMLValue<
	GenericValue extends unknown = unknown,
> = {
	"#text": GenericValue;
} & {};

export type XMLAttribute<
	GenericName extends string = never,
	GenericValue extends unknown = unknown,
> = {
	[Prop in GenericName as `@_${GenericName}`]: GenericValue
};

export type XMLContent =
	| XMLValue
	| XMLAttribute
	| XMLTag;

export type XMLTag<
	GenericName extends string = never,
	GenericXMLContent extends XMLContent = {},
> = {
	[Prop in GenericName]: GenericXMLContent
};

export function valueXML<
	GenericZodType extends ZodType,
>(
	value: GenericZodType,
): ZodObject<
		XMLValue<GenericZodType>
	> {
	return zod.object({
		"#text": value,
	}) as never;
}

export function attributeXMLSchema<
	GenericName extends string,
	GenericZodType extends ZodType,
>(
	name: GenericName,
	value: GenericZodType,
): ZodObject<
		XMLAttribute<GenericName, GenericZodType>
	> {
	return zod.object({
		[`@_${name}`]: value,
	}) as never;
}

export function tagXMLSchema<
	GenericName extends string,
	GenericZodObject extends ZodObject<{}>,
	GenericZodRawShape extends(
		UnionToIntersection<
			GenericZodObject extends ZodObject<infer InferedZodRawShape extends {}>
				? InferedZodRawShape
				: never
		> extends infer InferedZodRawShape extends {}
			? InferedZodRawShape
			: never
	),
>(
	name: GenericName,
	content: GenericZodObject[],
): ZodObject<
		XMLTag<
			GenericName,
			ZodObject<
				SimplifyObjectTopLevel<GenericZodRawShape>
			>
		>
	> {
	return zod.object({
		[name]: content.reduce(
			(pv, cv) => pv.extend(cv.shape),
			zod.object({}),
		),
	}) as never;
}

export type zodInfer<GenericZodType extends ZodType> = zInfer<GenericZodType>;

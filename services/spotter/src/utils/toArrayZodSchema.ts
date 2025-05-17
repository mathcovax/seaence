import type { ZodType } from "zod";

export function toArrayZodSchema<
	GenericZodSchema extends ZodType,
>(
	zodSchema: GenericZodSchema,
) {
	return zod.union([
		zodSchema.array(),
		zodSchema.transform((value) => [value as GenericZodSchema["_output"]]),
	]);
}

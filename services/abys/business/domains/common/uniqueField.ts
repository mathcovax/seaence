import { createEnum, type GetValueObject, zod } from "@vendors/clean";

export const uniqueFieldNameEnum = createEnum([
	"DOI",
	"BOOKID",
]);

export const uniqueFieldObjecter = zod
	.object({
		name: zod.enum(uniqueFieldNameEnum.toTuple()),
		value: zod.string(),
	})
	.createValueObjecter("uniqueField");

export type UniqueField = GetValueObject<typeof uniqueFieldObjecter>;

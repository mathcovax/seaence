import { createEnum, type GetValueObject, zod } from "@vendors/clean";

export const uniqueFieldNameEnum = createEnum([
	"digitalObjectIdentifier",
	"specific",
]);

export const uniqueFieldObjecter = zod
	.object({
		name: zod.enum(uniqueFieldNameEnum.toTuple()),
		value: zod.string(),
	})
	.createValueObjecter("uniqueField");

export type UniqueField = GetValueObject<typeof uniqueFieldObjecter>;

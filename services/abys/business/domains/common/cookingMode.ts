import { createEnum, type GetValueObject, zod } from "@vendors/clean";

const cookingModeEnum = createEnum([
	"default",
	"googleScrape",
	"libretranslate",
]);

export const cookingModeObjecter = zod
	.enum(cookingModeEnum.toTuple())
	.createValueObjecter("cookingMode");

export type CookingMode = GetValueObject<typeof cookingModeObjecter>;

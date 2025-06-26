import type { ExpectType } from "@duplojs/utils";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import type { CookingMode } from "@vendors/clients-type/bridge/duplojsTypesCodegen";

export const cookingModeEnum = createEnum([
	"default",
	"googleScrape",
	"libretranslate",
]);

type _ExpectCookingMode = ExpectType<
	GetEnumValue<typeof cookingModeEnum>,
	CookingMode,
	"strict"
>;

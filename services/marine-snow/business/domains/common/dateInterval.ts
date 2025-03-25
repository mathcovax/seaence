import { type GetValueObject, zod } from "@vendors/clean";
import { dateYYYYMMDDObjecter } from "./dateYYYYMMDD";

export const dateIntervalObjecter = zod.object({
	from: dateYYYYMMDDObjecter.zodSchema,
	to: dateYYYYMMDDObjecter.zodSchema,
}).createValueObjecter("dateInterval");

export type DateInterval = GetValueObject<typeof dateIntervalObjecter>;

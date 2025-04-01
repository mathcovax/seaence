import { type GetValueObject, zod } from "@vendors/clean";

const dateObjecter = zod.date().createValueObjecter("date");
type Date = GetValueObject<typeof dateObjecter>;

const dateIntervalObjecter = zod.object({
	from: dateObjecter.zodSchema,
	to: dateObjecter.zodSchema,
}).createValueObjecter("dateInterval");
type DateInterval = GetValueObject<typeof dateIntervalObjecter>;

const urlObjecter = zod.string().url().createValueObjecter("url");
type Url = GetValueObject<typeof urlObjecter>;

export {
	dateObjecter,
	Date,
	urlObjecter,
	Url,
	dateIntervalObjecter,
	DateInterval,
};

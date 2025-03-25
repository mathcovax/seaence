import { zod, type GetValueObject } from "@vendors/clean";

const zero = 0;

export const dateYYYYMMDDObjecter = zod
	.date()
	.refine(
		(date) => date.getHours() === zero
			&& date.getMinutes() === zero
			&& date.getSeconds() === zero
			&& date.getMilliseconds() === zero,
	)
	.createValueObjecter("date");

export type DateYYYYMMDD = GetValueObject<typeof dateYYYYMMDDObjecter>;

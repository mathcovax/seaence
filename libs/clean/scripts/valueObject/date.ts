import { z as zod } from "zod";
import { type GetValueObject } from "../valueObject";

export const commonDateObjecter = zod.date().createValueObjecter("commonDate");

export type CommonDate = GetValueObject<typeof commonDateObjecter>;

export const commonDateIntervalObjecter = zod
	.object({
		from: commonDateObjecter.zodSchema,
		to: commonDateObjecter.zodSchema,
	})
	.createValueObjecter("dateInterval");

export type CommonDateInterval = GetValueObject<typeof commonDateIntervalObjecter>;

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

export const dateYYYYMMDDIntervalObjecter = zod
	.object({
		from: dateYYYYMMDDObjecter.zodSchema,
		to: dateYYYYMMDDObjecter.zodSchema,
	})
	.createValueObjecter("dateInterval");

export type DateYYYYMMDDInterval = GetValueObject<typeof dateYYYYMMDDIntervalObjecter>;

export const flexibleDateObjecter = zod
	.union([
		zod.object({
			day: zod.null(),
			month: zod.null(),
			year: zod.number(),
		}),
		zod.object({
			day: zod.null(),
			month: zod.number(),
			year: zod.number(),
		}),
		zod.object({
			day: zod.number(),
			month: zod.number(),
			year: zod.number(),
		}),
	])
	.createValueObjecter("flexibleDate");

export type FlexibleDate = GetValueObject<typeof flexibleDateObjecter>;

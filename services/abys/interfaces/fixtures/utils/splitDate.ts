import { match } from "ts-pattern";

/* eslint-disable @typescript-eslint/no-magic-numbers */
export function makeSplitDate(date: Date) {
	return {
		day: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
	};
}

export type SplitDate = {
	day: null;
	month: null;
	year: number;
} | {
	day: null;
	month: number;
	year: number;
} | {
	day: number;
	month: number;
	year: number;
} | null;

export function makePartialSplitDate(options: {
	includeDay?: boolean;
	includeMonth?: boolean;
	date: Date;
}) {
	const { includeDay = true, includeMonth = true, date } = options;

	return match({
		includeDay,
		includeMonth,
	})
		.with({
			includeDay: false,
			includeMonth: false,
		}, () => ({
			day: null,
			month: null,
			year: date.getFullYear(),
		}))
		.with({
			includeDay: false,
			includeMonth: true,
		}, () => ({
			day: null,
			month: date.getMonth() + 1,
			year: date.getFullYear(),
		}))
		.with({
			includeDay: true,
			includeMonth: true,
		}, () => ({
			day: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear(),
		}))
		.otherwise(() => null);
}

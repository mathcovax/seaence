/* eslint-disable @typescript-eslint/no-magic-numbers */
export function makeSplitDate(date: Date) {
	return {
		day: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
	};
}

export function makePartialSplitDate(options: {
	includeDay?: boolean;
	includeMonth?: boolean;
	date: Date;
}) {
	const { includeDay = true, includeMonth = true, date } = options;

	return {
		day: includeDay ? date.getDate() : null,
		month: includeMonth ? date.getMonth() + 1 : null,
		year: date.getFullYear(),
	};
}

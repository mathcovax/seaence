import { type splitDateSchema } from "@interfaces/providers/scienceDatabase/pubmed/types/article";
import { TechnicalError } from "@vendors/clean";
import { match, P } from "ts-pattern";

export function formatDate(splitDate: typeof splitDateSchema["_output"]) {
	return match({
		year: splitDate.Year["#text"],
		month: splitDate.Month?.["#text"] ?? null,
		day: splitDate.Day?.["#text"] ?? null,
	})
		.with(
			{
				year: P.number,
				month: P.number,
				day: null,
			},
			(splitDate) => splitDate,
		)
		.with(
			{
				year: P.number,
				month: null,
				day: null,
			},
			(splitDate) => splitDate,
		)
		.with(
			{
				year: P.number,
				month: P.number,
				day: P.number,
			},
			(splitDate) => splitDate,
		)
		.otherwise(
			(splitDate) => new TechnicalError("Wrong split date format", splitDate),
		);
}

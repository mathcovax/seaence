import { UsecaseHandler } from "@vendors/clean";
// repositories
import { rawDocumentRepository } from "../repositories/rawDocument";
// types
import { type DateInterval } from "@business/domains/types/common";

interface Input {
	dateInterval: DateInterval;
}
export class GetRawDocumentWhereDateIntervalUsecase extends UsecaseHandler.create(
	{
		rawDocumentRepository,
	},
) {
	public execute({ dateInterval }: Input) {
		return this.rawDocumentRepository.findByDateInterval(dateInterval);
	}
}

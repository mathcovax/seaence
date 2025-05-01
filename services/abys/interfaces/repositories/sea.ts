import { seaRepository } from "@business/applications/repositories/sea";
import { SeaAPI } from "@interfaces/providers/sea";
import { TechnicalError } from "@vendors/clean/error";

seaRepository.default = {
	save() {
		throw new TechnicalError("Save ar not allow.");
	},
	async sendBakedDocument(bakedDocument) {
		const { language, ...restSimplifyObject } = bakedDocument.toSimpleObject();

		const defaultDay = 5;
		const defaultMonth = 5;
		const offsetMonth = 1;

		const journalPublishDate = restSimplifyObject.journalPublishDate
			? new Date(
				restSimplifyObject.journalPublishDate.year,
				restSimplifyObject.journalPublishDate.month
					? restSimplifyObject.journalPublishDate.month - offsetMonth
					: defaultMonth,
				restSimplifyObject.journalPublishDate.day ?? defaultDay,
			).toISOString()
			: null;

		await SeaAPI.sendDocument(
			language,
			{
				abysBakedDocumentId: restSimplifyObject.id,
				title: restSimplifyObject.title,
				abstract: restSimplifyObject.abstract,
				abstractDetails: restSimplifyObject.abstractDetails,
				keywords: restSimplifyObject.keywords,
				resources: restSimplifyObject.resources,
				webPublishDate: restSimplifyObject.webPublishDate?.toISOString() ?? null,
				webPublishSplitDate: restSimplifyObject.webPublishDate
					? {
						year: restSimplifyObject.webPublishDate.getFullYear(),
						month: restSimplifyObject.webPublishDate.getMonth() + offsetMonth,
						day: restSimplifyObject.webPublishDate.getDate(),
					}
					: null,
				journalPublishDate,
				journalPublishSplitDate: restSimplifyObject.journalPublishDate,
			},
		);
	},
};

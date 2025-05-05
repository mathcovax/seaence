import { seaRepository } from "@business/applications/repositories/sea";
import { type Provider, providerEnum } from "@business/domains/common/provider";
import { SeaAPI } from "@interfaces/providers/sea";
import { TechnicalError } from "@vendors/clean/error";
import { match, P } from "ts-pattern";

seaRepository.default = {
	save() {
		throw new TechnicalError("Save ar not allow.");
	},
	async sendBakedDocument(bakedDocument) {
		const { language, ...restSimplifyObject } = bakedDocument.toSimpleObject();

		const defaultDay = 15;
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

		const webPublishDate = restSimplifyObject.webPublishDate
			? new Date(
				restSimplifyObject.webPublishDate.year,
				restSimplifyObject.webPublishDate.month
					? restSimplifyObject.webPublishDate.month - offsetMonth
					: defaultMonth,
				restSimplifyObject.webPublishDate.day ?? defaultDay,
			).toISOString()
			: null;

		const providers = restSimplifyObject
			.resources
			.map(({ resourceProvider }) => resourceProvider)
			.filter((resourceProvider): resourceProvider is Provider["value"] => providerEnum.has(resourceProvider))
			.map((value) => ({ value }));

		const { abstract, abstractDetails } = restSimplifyObject;

		const summaryTronc = {
			from: 0,
			to: 300,
		};

		const summary = match({
			abstract,
			abstractDetails,
		})
			.with(
				{ abstract: P.nonNullable },
				({ abstract }) => abstract.substring(summaryTronc.from, summaryTronc.to),
			)
			.with(
				{ abstractDetails: P.nonNullable },
				({ abstractDetails }) => abstractDetails
					.map(({ content }) => content)
					.join(" ")
					.substring(summaryTronc.from, summaryTronc.to),
			)
			.with(
				{
					abstract: null,
					abstractDetails: null,
				},
				() => null,
			)
			.exhaustive();

		await SeaAPI.sendDocument(
			language,
			{
				abysBakedDocumentId: restSimplifyObject.id,
				articleTypes: restSimplifyObject.articleTypes,
				authors: restSimplifyObject.authors,
				title: restSimplifyObject.title,
				summary,
				abstract: restSimplifyObject.abstract,
				abstractDetails: restSimplifyObject.abstractDetails,
				keywords: restSimplifyObject.keywords,
				providers,
				webPublishDate,
				webPublishSplitDate: restSimplifyObject.webPublishDate,
				journalPublishDate,
				journalPublishSplitDate: restSimplifyObject.journalPublishDate,
			},
		);
	},
};

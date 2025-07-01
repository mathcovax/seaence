import { searchEngineRepository } from "@business/applications/repositories/searchEngine";
import { type Provider, providerEnum } from "@business/domains/common/provider";
import { SeaAPI } from "@interfaces/providers/sea";
import { TechnicalError } from "@vendors/clean/error";
import { match, P } from "ts-pattern";

searchEngineRepository.default = {
	save() {
		throw new TechnicalError("Save ar not allow.");
	},
	async indexBakedDocument(bakedDocument) {
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
			.filter((resourceProvider): resourceProvider is Provider["value"] => providerEnum.has(resourceProvider));

		const { abstract, abstractDetails } = restSimplifyObject;

		const summaryTronc = {
			from: 0,
			to: 300,
		};

		const joinedAbstractDetails = abstractDetails
			?.map(({ content, label }) => `${label}: ${content}`)
			.join(" ") ?? null;

		const summary = match({
			abstract,
			joinedAbstractDetails,
		})
			.with(
				{ abstract: P.nonNullable },
				({ abstract }) => abstract.substring(summaryTronc.from, summaryTronc.to),
			)
			.with(
				{ joinedAbstractDetails: P.nonNullable },
				({ joinedAbstractDetails }) => joinedAbstractDetails
					.substring(summaryTronc.from, summaryTronc.to),
			)
			.with(
				{
					abstract: null,
					joinedAbstractDetails: null,
				},
				() => null,
			)
			.exhaustive();

		await SeaAPI.sendDocument(
			language,
			{
				bakedDocumentId: restSimplifyObject.id,
				nodeSameRawDocumentId: restSimplifyObject.nodeSameRawDocumentId,
				articleTypes: restSimplifyObject.articleTypes,
				authors: restSimplifyObject.authors.map(
					({ name }) => name,
				),
				title: restSimplifyObject.title,
				summary: summary && `${summary}..`,
				abstract: abstract
					?? joinedAbstractDetails
					?? null,
				keywords: restSimplifyObject.keywords.map(
					({ value }) => value,
				),
				providers,
				webPublishDate,
				webPublishSplitDate: restSimplifyObject.webPublishDate,
				journalPublishDate,
				journalPublishSplitDate: restSimplifyObject.journalPublishDate,
			},
		);
	},
};

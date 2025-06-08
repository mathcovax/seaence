import { bakedDocumentTranslationReportingAggregateRepository } from "@business/applications/repositories/bakedDocumentTranslationReportingAggregate";
import { BakedDocumentTranslationReportingAggregateEntity } from "@business/domains/entities/bakedDocumentTranslationReportingAggregate";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter, RepositoryError } from "@vendors/clean";

interface FindManyRawResult {
	_id: string;
	reportingQuantity: number;
}

interface CountTotalRawResult {
	total: number;
}

bakedDocumentTranslationReportingAggregateRepository.default = {
	save() {
		throw new RepositoryError("save-method-is-not-callable");
	},

	async findMany({ quantityPerPage, page }) {
		return mongo.bakedDocumentTranslationReportingCollection
			.aggregate<FindManyRawResult>([
				{
					$group: {
						_id: "$bakedDocumentId",
						reportingQuantity: { $sum: 1 },
					},
				},
				{ $sort: { reportingQuantity: -1 } },
				{ $skip: page.value * quantityPerPage.value },
				{ $limit: quantityPerPage.value },
			])
			.toArray()
			.then(
				(mongoEntitys) => mongoEntitys
					.map(
						(mongoEntity) => EntityHandler.unsafeMapper(
							BakedDocumentTranslationReportingAggregateEntity,
							{
								bakedDocumentId: mongoEntity._id,
								reportingQuantity: mongoEntity.reportingQuantity,
							},
						),
					),
			);
	},
	countTotal() {
		const defaultCountValue = 0;

		return mongo.bakedDocumentTranslationReportingCollection
			.aggregate<CountTotalRawResult>([
				{
					$group: {
						_id: "$bakedDocumentId",
					},
				},
				{ $count: "total" },
			])
			.toArray()
			.then(
				(mongoEntitys) => {
					const mongoEntity = mongoEntitys.shift();

					return intObjecter.unsafeCreate(
						mongoEntity?.total ?? defaultCountValue,
					);
				},
			);
	},
};

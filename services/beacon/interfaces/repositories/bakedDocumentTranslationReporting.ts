import { bakedDocumentTranslationReportingRepository } from "@business/applications/repositories/bakedDocumentTranslationReporting";
import { BakedDocumentTranslationReportingEntity } from "@business/domains/entities/bakedDocumentTranslationReporting";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, intObjecter } from "@vendors/clean";

bakedDocumentTranslationReportingRepository.default = {
	async save(bakedDocumentTranslationReporting) {
		const simpleEntity = bakedDocumentTranslationReporting.toSimpleObject();

		await mongo.bakedDocumentTranslationReportingCollection
			.updateOne(
				{ id: simpleEntity.id },
				{ $set: simpleEntity },
				{ upsert: true },
			);

		return bakedDocumentTranslationReporting;
	},
	findOne(userId, bakedDocumentId) {
		return mongo.bakedDocumentTranslationReportingCollection
			.findOne({
				userId: userId.value,
				bakedDocumentId: bakedDocumentId.value,
			})
			.then(
				(mongoEntity) => mongoEntity && EntityHandler.unsafeMapper(
					BakedDocumentTranslationReportingEntity,
					mongoEntity,
				),
			);
	},
	findMany({ bakedDocumentId, page, quantityPerPage }) {
		return mongo.bakedDocumentTranslationReportingCollection
			.find({
				bakedDocumentId: bakedDocumentId.value,
			})
			.skip(page.value * quantityPerPage.value)
			.limit(quantityPerPage.value)
			.toArray()
			.then(
				(mongoEntitys) => mongoEntitys
					.map(
						(mongoEntity) => EntityHandler.unsafeMapper(
							BakedDocumentTranslationReportingEntity,
							mongoEntity,
						),
					),
			);
	},
	async deleteMany(bakedDocumentId) {
		await mongo
			.bakedDocumentTranslationReportingCollection
			.deleteMany({ bakedDocumentId: bakedDocumentId.value });
	},

	countTotalByBakedDocumentId(bakedDocumentId) {
		return mongo
			.bakedDocumentTranslationReportingCollection
			.countDocuments({
				bakedDocumentId: bakedDocumentId.value,
			})
			.then(intObjecter.unsafeCreate);
	},
};

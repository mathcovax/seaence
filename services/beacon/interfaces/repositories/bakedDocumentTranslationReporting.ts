import { bakedDocumentTranslationReportingRepository } from "@business/applications/repositories/bakedDocumentTranslationReporting";
import { BakedDocumentTranslationReportingEntity } from "@business/domains/entities/bakedDocumentTranslationReporting";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler } from "@vendors/clean";

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
	find(userId, bakedDocumentId) {
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
};

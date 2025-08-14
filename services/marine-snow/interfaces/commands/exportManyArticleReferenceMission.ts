import "../repositories";
import { exportArticleReferenceMissionRepository } from "@business/applications/repositories/exportArticleReferenceMission";
import { ExportManyArticleReferenceUsecase } from "@business/applications/usecases/exportArticleReference/many";
import { ExportManyArticleReferenceMissionEntity } from "@business/domains/entities/exportArticleReferenceMission/many";
import { logger } from "@vendors/backend-logger";
import { intObjecter } from "@vendors/clean";
import { program } from "commander";

program
	.requiredOption("-c, --concurrency <int>");

program.parse();

const { concurrency: rawConcurrency } = program.opts<Record<string, string>>();

const concurrency = intObjecter.throwCreate(Number(rawConcurrency));

const implementedExportArticleReferenceMissionRepository = exportArticleReferenceMissionRepository.use;

const exportManyArticleReferenceUsecase = new ExportManyArticleReferenceUsecase({
	exportArticleReferenceMissionRepository: {
		...implementedExportArticleReferenceMissionRepository,
		save(entity) {
			if (entity instanceof ExportManyArticleReferenceMissionEntity) {
				console.log(`Quantity Processed: ${entity.quantityProcessed.value}`);
			}

			return implementedExportArticleReferenceMissionRepository.save(entity);
		},
	},
});

const mission = await exportManyArticleReferenceUsecase.execute({ concurrency });

logger(mission);

if (mission instanceof Error) {
	throw mission;
}

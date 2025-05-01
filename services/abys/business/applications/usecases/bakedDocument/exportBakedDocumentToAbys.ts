import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { seaRepository } from "@business/applications/repositories/sea";
import { UsecaseHandler } from "@vendors/clean";

interface Input {

}

export class ExportBakedDocumentToAbysUsecase extends UsecaseHandler.create({
	bakedDocumentRepository,
	seaRepository,
}) {
	public async execute(__: Input) {
		for await (
			const bakedDocument of this.bakedDocumentRepository.findUpdatedDocuments()
		) {
			await this.seaRepository.sendBakedDocument(bakedDocument);

			await this.bakedDocumentRepository.save(
				bakedDocument.exportToSea(),
			);
		}
	}
}

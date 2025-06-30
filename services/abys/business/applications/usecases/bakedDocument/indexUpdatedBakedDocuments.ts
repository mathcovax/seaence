import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { UsecaseHandler } from "@vendors/clean";
import { IndexBakedDocumentUsecase } from "./indexBakedDocument";

interface Input {

}

export class IndexUpdatedBakedDocumentsUsecase extends UsecaseHandler.create({
	bakedDocumentRepository,
	indexation: IndexBakedDocumentUsecase,
}) {
	public async execute(__: Input) {
		for await (
			const bakedDocument of this.bakedDocumentRepository.findUpdatedDocuments()
		) {
			await this.indexation({ bakedDocument });
		}
	}
}

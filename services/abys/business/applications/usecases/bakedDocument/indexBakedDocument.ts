import { bakedDocumentRepository } from "@business/applications/repositories/bakedDocument";
import { searchEngineRepository } from "@business/applications/repositories/searchEngine";
import { type BakedDocumentEntity } from "@business/domains/entities/bakedDocument";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	bakedDocument: BakedDocumentEntity;
}

export class IndexBakedDocumentUsecase extends UsecaseHandler.create({
	searchEngineRepository,
	bakedDocumentRepository,
}) {
	public async execute({ bakedDocument }: Input) {
		await this.searchEngineRepository.indexBakedDocument(bakedDocument);

		await this.bakedDocumentRepository.save(
			bakedDocument.indexation(),
		);
	}
}

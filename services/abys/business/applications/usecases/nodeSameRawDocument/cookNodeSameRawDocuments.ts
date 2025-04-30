import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { UsecaseHandler } from "@vendors/clean";
import { UpsertBakedDocumentUsecase } from "../bakedDocument/upsertBakedDocument";
import { bakedDocumentLanguageEnum, bakedDocumentLanguageObjecter } from "@business/domains/entities/bakedDocument";

interface Input {

}

const bakedDocumentLanguages = bakedDocumentLanguageEnum
	.toTuple()
	.map(
		(language) => bakedDocumentLanguageObjecter.unsafeCreate(language),
	);

export class CookNodeSameRawDocumentsUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
	cookNode: UpsertBakedDocumentUsecase,
}) {
	public async execute(__: Input) {
		for await (const nodeSameRawDocument of this.nodeSameRawDocumentRepository.findUpdatedNode()) {
			await Promise.all(
				bakedDocumentLanguages
					.map(
						(language) => this.cookNode({
							language,
							nodeSameRawDocument,
						}),
					),
			);

			await this.nodeSameRawDocumentRepository.save(
				nodeSameRawDocument.cook(),
			);
		}
	}
}

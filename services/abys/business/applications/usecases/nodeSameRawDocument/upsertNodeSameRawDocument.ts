import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { rawDocumentRepository, type RawDocumentEntity } from "@business/applications/repositories/rawDocument";
import { providerObjecter } from "@business/domains/common/provider";
import { NodeSameRawDocumentEntity, rawDocumentWrapperObjecter } from "@business/domains/entities/nodeSameRawDocument";
import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { UsecaseHandler } from "@vendors/clean";
import { match, P } from "ts-pattern";

interface Input {
	rawDocument: RawDocumentEntity;
}

export class UpsertNodeSameRawDocumentUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
	rawDocumentRepository,
}) {
	public async execute(input: Input) {
		const { rawDocument } = input;

		const provider = match(input)
			.with(
				{ rawDocument: P.instanceOf(PubmedRawDocumentEntity) },
				() => providerObjecter.unsafeCreate("pubmed"),
			)
			.exhaustive();

		const nodeSameRawDocument = await this
			.nodeSameRawDocumentRepository
			.findNodeSameRawDocumentbyRawDocument(
				rawDocument,
			);

		const result = match({ nodeSameRawDocument })
			.with(
				{ nodeSameRawDocument: P.nonNullable },
				({ nodeSameRawDocument }) => nodeSameRawDocument.setValueRawDocumentWrapper(
					provider,
					rawDocument.resourceUrl,
				),
			)
			.with(
				{ nodeSameRawDocument: null },
				() => NodeSameRawDocumentEntity.create({
					id: this.nodeSameRawDocumentRepository.generateNodeSameRawDocumentId(),
					uniqueField: this.rawDocumentRepository.findUniqueField(rawDocument),
					rawDocumentWrapper: rawDocumentWrapperObjecter.unsafeCreate({
						[provider.value]: rawDocument.resourceUrl.value,
					}),
				}),
			)
			.exhaustive();

		await this.nodeSameRawDocumentRepository.save(result);
	}
}

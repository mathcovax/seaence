import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { rawDocumentRepository, type RawDocument } from "@business/applications/repositories/rawDocument";
import { providerObjecter } from "@business/domains/common/provider";
import { NodeSameRawDocumentEntity, rawDocumentWrapperObjecter } from "@business/domains/entities/nodeSameRawDocument";
import { PubmedRawDocumentEntity } from "@business/domains/entities/rawDocument/pubmed";
import { UsecaseHandler } from "@vendors/clean";
import { match, P } from "ts-pattern";

interface Input {
	rawDocument: RawDocument;
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

		const findedNodeSameRawDocument = await this
			.nodeSameRawDocumentRepository
			.findNodeSameRawDocumentbyRawDocument(
				rawDocument,
			);

		const nodeSameRawDocument = match({ findedNodeSameRawDocument })
			.with(
				{ findedNodeSameRawDocument: P.nonNullable },
				({ findedNodeSameRawDocument }) => findedNodeSameRawDocument.setValueRawDocumentWrapper(
					provider,
					rawDocument.resourceUrl,
				),
			)
			.with(
				{ findedNodeSameRawDocument: null },
				() => NodeSameRawDocumentEntity.create({
					id: this.nodeSameRawDocumentRepository.generateNodeSameRawDocumentId(),
					uniqueField: rawDocument.uniqueArticleField,
					rawDocumentWrapper: rawDocumentWrapperObjecter.unsafeCreate({
						[provider.value]: rawDocument.resourceUrl.value,
					}),
				}),
			)
			.exhaustive();

		await this.nodeSameRawDocumentRepository.save(nodeSameRawDocument);
	}
}

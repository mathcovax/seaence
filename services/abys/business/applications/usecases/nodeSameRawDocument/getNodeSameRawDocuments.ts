import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { intObjecter, UsecaseHandler, type Int } from "@vendors/clean";

interface Input {
	page: Int;
}

const objectPerPage = 10;
const nodeSameRawDocumentPerPage = intObjecter.unsafeCreate(objectPerPage);

export class GetNodeSameRawDocumentsUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
}) {
	public execute(input: Input) {
		const { page } = input;

		return this.nodeSameRawDocumentRepository.findNodeSameRawDocumentPerPage({
			page,
			quantityPerPage: nodeSameRawDocumentPerPage,
		});
	}
}

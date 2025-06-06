import { nodeSameRawDocumentRepository } from "@business/applications/repositories/nodeSameRawDocument";
import { type NodeSameRawDocumentId } from "@business/domains/entities/nodeSameRawDocument";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	nodeSameRawDocumentId: NodeSameRawDocumentId;
}

export class FindOneNodeSameRawDocumentUsecase extends UsecaseHandler.create({
	nodeSameRawDocumentRepository,
}) {
	public execute({ nodeSameRawDocumentId }: Input) {
		return this.nodeSameRawDocumentRepository
			.findOneById(nodeSameRawDocumentId);
	}
}

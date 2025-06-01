import { EntityHandler, type GetValueObject, UsecaseHandler } from "@vendors/clean";
import { DocumentInFolderEntity, type NodeSameRawDocumentId } from "@business/domains/entities/documentInFolder";
import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";
import { type UserDocumentFolder } from "../documentFolder/userFindDocumentFolderById";

interface Input {
	userDocumentFolder: UserDocumentFolder;
	nodeSameRawDocumentId: NodeSameRawDocumentId;
}

const userDocumentInFolderObjecter = EntityHandler.createEntityObjecter(
	"userDocumentInFolder",
	DocumentInFolderEntity,
);

export type UserDocumentInFolder = GetValueObject<typeof userDocumentInFolderObjecter>;

export class UserFindDocumentInFolderByUniqueCombinationUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public async execute({ userDocumentFolder, nodeSameRawDocumentId }: Input) {
		const findedDocumentInFolder = await this.documentInFolderRepository.findDocumentInFolder(
			userDocumentFolder.value.id,
			nodeSameRawDocumentId,
		);

		if (!findedDocumentInFolder) {
			return null;
		}

		return userDocumentInFolderObjecter.unsafeCreate(findedDocumentInFolder);
	}
}

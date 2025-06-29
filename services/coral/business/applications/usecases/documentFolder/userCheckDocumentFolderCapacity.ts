import { EntityHandler, type GetValueObject, UsecaseError, UsecaseHandler } from "@vendors/clean";
import { type UserDocumentFolder } from "./userFindDocumentFolderById";
import { DocumentFolderEntity } from "@business/domains/entities/documentFolder";
import { documentInFolderRepository } from "@business/applications/repositories/documentInFolder";

interface Input {
	userDocumentFolder: UserDocumentFolder;
}

const userDocumentFolderWithCapacityObjecter = EntityHandler.createEntityObjecter(
	"userDocumentFolderWithCapacity",
	DocumentFolderEntity,
);

export type UserDocumentFolderWithCapacity = GetValueObject<typeof userDocumentFolderWithCapacityObjecter>;

const maxDocumentInFolderQuantity = 20;

export class UserCheckDocumentFolderCapacityUsecase extends UsecaseHandler.create({
	documentInFolderRepository,
}) {
	public execute({ userDocumentFolder }: Input) {
		if (userDocumentFolder.value.numberOfDocument.value >= maxDocumentInFolderQuantity) {
			return new UsecaseError("document-in-folder-max-quantity", {
				folder: userDocumentFolder.value,
				max: maxDocumentInFolderQuantity,
			});
		}

		return userDocumentFolderWithCapacityObjecter.unsafeCreate(
			EntityHandler.unsafeMapper(
				DocumentFolderEntity,
				userDocumentFolder.toSimpleObject(),
			),
		);
	}
}

import { type EntityToSimpleObject } from "@vendors/clean";
import { type DocumentInFolderEntity } from "@business/domains/entities/documentInFolder";

export interface MongoDocumentInFolder extends EntityToSimpleObject<typeof DocumentInFolderEntity> {
	updatedAt: Date;
}

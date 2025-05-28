import { type EntityToSimpleObject } from "@vendors/clean";
import { type DocumentFolderEntity } from "@business/domains/entities/documentFolder";

export interface MongoDocumentFolder extends EntityToSimpleObject<typeof DocumentFolderEntity> {
	createdAt: Date;
	updatedAt: Date;
}

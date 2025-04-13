import { type BakedDocumentEntity } from "@business/domains/entities/bakedDocument";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoBakedDocument extends EntityToSimpleObject<typeof BakedDocumentEntity> {
	createdAt: Date;
	updatedAt: Date;
}

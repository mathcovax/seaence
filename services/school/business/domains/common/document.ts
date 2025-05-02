import { EntityHandler, type GetValueObject } from "@vendors/clean";
import { DocumentEntity } from "../entities/document";

export const documentObjecter = EntityHandler.createEntityObjecter("document", DocumentEntity);

export type Document = GetValueObject<typeof documentObjecter>;

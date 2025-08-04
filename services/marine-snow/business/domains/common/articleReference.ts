import { EntityHandler, type GetValueObject } from "@vendors/clean";
import { ArticleReferenceEntity } from "../entities/articleReference";

export const articleReferenceObjecter = EntityHandler.createEntityObjecter(
	"articleReference",
	ArticleReferenceEntity,
);

export type ArticleReferenceValueObject = GetValueObject<typeof articleReferenceObjecter>;

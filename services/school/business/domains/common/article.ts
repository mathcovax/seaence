import { EntityHandler, type GetValueObject } from "@vendors/clean";
import { ArticleEntity } from "../entities/article";

export const articleObjecter = EntityHandler.createEntityObjecter("article", ArticleEntity);

export type Article = GetValueObject<typeof articleObjecter>;

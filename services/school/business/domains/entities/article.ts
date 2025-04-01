import { EntityHandler, type GetEntityProperties, type GetValueObject, zod } from "@vendors/clean";

export const articleIdObjecter = zod.string().createValueObjecter("articleId");
export const articleTitleObjecter = zod.string().createValueObjecter("articleTitle");

export type ArticleId = GetValueObject<typeof articleIdObjecter>;
export type ArticleTitle = GetValueObject<typeof articleTitleObjecter>;

export class ArticleEntity extends EntityHandler.create({
	id: articleIdObjecter,
	title: articleTitleObjecter,
}) {
	public static create(params: GetEntityProperties<typeof ArticleEntity>) {
		return new ArticleEntity(params);
	}
}

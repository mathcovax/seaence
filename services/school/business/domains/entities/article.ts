import { EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";

export const articleIdObjecter = zod.string().createValueObjecter("articleId");
export const articleTitleObjecter = zod.string().createValueObjecter("articleTitle");
export const articleContentObjecter = zod.string().createValueObjecter("articleContent");

export type ArticleId = GetValueObject<typeof articleIdObjecter>;
export type ArticleTitle = GetValueObject<typeof articleTitleObjecter>;
export type ArticleContent = GetValueObject<typeof articleContentObjecter>;

export class ArticleEntity extends EntityHandler.create({
	articleId: articleIdObjecter,
	title: articleTitleObjecter,
	content: articleContentObjecter,
}) {
	public static create(params: GetEntityProperties<typeof ArticleEntity>) {
		return new ArticleEntity(params);
	}
}

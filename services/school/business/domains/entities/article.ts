import { EntityHandler, type GetEntityProperties, type GetValueObject } from "@vendors/clean";

export const articleIdObjecter = zod.string().createValueObjecter("articleId");
const articleTitleObjecter = zod.string().createValueObjecter("articleTitle");
const articleContentObjecter = zod.string().createValueObjecter("articleContent");

export type ArticleId = GetValueObject<typeof articleIdObjecter>;
export type ArticleTitle = GetValueObject<typeof articleTitleObjecter>;
export type ArticleContent = GetValueObject<typeof articleContentObjecter>;

export class ArticleEntity extends EntityHandler.create({
	title: articleTitleObjecter,
	content: articleContentObjecter,
}) {
	public static create(params: GetEntityProperties<ArticleEntity>) {
		return new ArticleEntity(params);
	}
}

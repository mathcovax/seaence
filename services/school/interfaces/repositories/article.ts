import { articleRepository } from "@business/applications/repositories/article";
import { articleContentObjecter, ArticleEntity, articleIdObjecter, articleTitleObjecter } from "@business/domains/entities/article";
import { mongo } from "@interfaces/providers/mongo";

articleRepository.default = {
	async findOneById(articleId) {
		const mongoArticle = await mongo.articleCollection.findOne({
			articleId: articleId.value,
		});

		if (!mongoArticle) {
			return null;
		}

		return ArticleEntity.create({
			articleId: articleIdObjecter.unsafeCreate(mongoArticle.articleId),
			title: articleTitleObjecter.unsafeCreate(mongoArticle.title),
			content: articleContentObjecter.unsafeCreate(mongoArticle.content),
		});
	},
	async save(article) {
		await mongo.articleCollection.insertOne({
			articleId: article.articleId.value,
			title: article.title.value,
			content: article.content.value,
		});
		return article;
	},
};

export const articleExistCheck = createChecker("articleExist")
	.handler(
		(input: string, output) => {
			//TODO use abys provider to check if article exists
			const article = null;

			if (article) {
				return output("article.exist", article);
			} else {
				return output("article.notfound", null);
			}
		},
	);

export const iWantArticleExistById = createPresetChecker(
	articleExistCheck,
	{
		result: "article.exist",
		catch: () => new NotFoundHttpResponse("article.notfound"),
		indexing: "article",
	},
	makeResponseContract(NotFoundHttpResponse, "article.notfound"),
);

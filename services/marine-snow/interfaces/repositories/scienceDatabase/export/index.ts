import { type ScienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { type ArticleReferenceEntity } from "@business/domains/entities/articleReference";
import { getTypedEntries } from "@duplojs/utils";
import { RepositoryError, TechnicalError } from "@vendors/clean";
import { match } from "ts-pattern";
import { sendPubmedArticle } from "./pubmed/send";
import { fetchPubmedArticle } from "./pubmed/fetch";
import { logger } from "@vendors/backend-logger";

type Result = ReturnType<ScienceDatabaseRepository["exportArticleReferences"]>;

export function exportArticleReferences(
	articleReferences: ArticleReferenceEntity[],
) {
	return Promise
		.all(
			getTypedEntries(
				Object.groupBy(
					articleReferences,
					({ provider }) => provider.value,
				),
			).map(
				([provider, groupedArticleReferences]) => match(provider)
					.returnType<Result>()
					.with(
						"pubmed",
						async() => {
							const articles = await fetchPubmedArticle(
								groupedArticleReferences.map(({ value }) => value.value),
							);

							if (articles instanceof Error) {
								return {
									failedExportArticleReferences: groupedArticleReferences.map(
										(articleReference) => new RepositoryError("failed-to-export-article-reference", {
											error: articles,
											articleReference,
										}),
									),
									successExportArticleReferences: [],
								};
							}

							const sendResults = await Promise.all(
								articles.map(
									(article) => sendPubmedArticle(
										article,
									),
								),
							);

							return groupedArticleReferences.reduce<Awaited<Result>>(
								(acc, articleReference) => {
									const sendResult = sendResults.find(
										({ reference }) => reference === articleReference.value.value,
									);

									if (!sendResult || sendResult.error) {
										logger(articleReference, sendResult);

										acc.failedExportArticleReferences.push(
											new RepositoryError("failed-to-export-article-reference", {
												error: sendResult?.error ?? new TechnicalError("missing-send-result"),
												articleReference,
											}),
										);
									} else {
										acc.successExportArticleReferences.push(articleReference);
									}

									return acc;
								},
								{
									successExportArticleReferences: [],
									failedExportArticleReferences: [],
								},
							);
						},
					)
					.exhaustive(),
			),
		)
		.then(
			(result) => result.reduce<Awaited<Result>>(
				(acc, cv) => ({
					successExportArticleReferences: [
						...acc.successExportArticleReferences,
						...cv.successExportArticleReferences,
					],
					failedExportArticleReferences: [
						...acc.failedExportArticleReferences,
						...cv.failedExportArticleReferences,
					],
				}),
				{
					successExportArticleReferences: [],
					failedExportArticleReferences: [],
				},
			),
		);
}

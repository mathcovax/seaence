import { AbysAPI } from "@interfaces/providers/abys";
import { PubMedAPI } from "@interfaces/providers/scienceDatabase/pubmed";
import { TechnicalError, zod } from "@vendors/clean";
import { formatePubmedArticle } from "../formaters/pubmed/article";

interface ProcessedResult {
	reference: string;
	error?: Error;
}

const expectHttpCode = 200;

export async function pubmedSender(references: string[]): Promise<ProcessedResult[] | Error> {
	const pubmedResponse = await PubMedAPI.getArticle(
		references,
	);

	if (pubmedResponse instanceof Error) {
		return new TechnicalError(
			pubmedResponse instanceof zod.ZodError
				? "Parsing error when fetching article."
				: "Error when fetching article.",
			{ error: pubmedResponse },
		);
	}

	if (pubmedResponse.code !== expectHttpCode) {
		return new TechnicalError(
			"Wrong http code when fetching article.",
			{ pubmedResponse },
		);
	}

	if ("PubmedBookArticle" in pubmedResponse.body.PubmedArticleSet) {
		return new TechnicalError("Unsupport book.");
	}

	const processedSearchResults = await Promise.all(
		pubmedResponse.body.PubmedArticleSet.PubmedArticle
			.map(
				(pubmedArticle) => {
					const formatedPubmedArticle = formatePubmedArticle(pubmedArticle);

					return {
						reference: pubmedArticle.MedlineCitation.PMID["#text"],
						result: formatedPubmedArticle,
					};
				},
			)
			.map(
				async({ reference, result }): Promise<ProcessedResult> => {
					if (result instanceof Error) {
						return {
							reference,
							error: result,
						};
					}

					const abysResponse = await AbysAPI.sendRawDocument(result);

					if (abysResponse.information !== "rawDocument.upsert") {
						return {
							reference,
							error: new TechnicalError(
								"Wrong response when send doccument to abys.",
								{ abysResponse },
							),
						};
					}

					return {
						reference,
					};
				},
			),
	);

	return processedSearchResults;
}

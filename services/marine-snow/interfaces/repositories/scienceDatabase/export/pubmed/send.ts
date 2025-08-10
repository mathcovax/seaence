import { AbysAPI } from "@interfaces/providers/abys";
import { TechnicalError } from "@vendors/clean";
import { formatePubmedArticle } from "../formaters/pubmedArticle";
import { type fetchPubmedArticle } from "./fetch";

interface ProcessedResult {
	reference: string;
	error?: TechnicalError;
}

export async function sendPubmedArticle(
	article: Exclude<Awaited<ReturnType<typeof fetchPubmedArticle>>, Error>[number],
): Promise<ProcessedResult> {
	const reference = article.MedlineCitation.PMID["#text"];
	const formatedPubmedArticle = formatePubmedArticle(article);

	if (formatedPubmedArticle instanceof Error) {
		return {
			reference,
			error: formatedPubmedArticle,
		};
	}

	const abysResponse = await AbysAPI.sendRawDocument(formatedPubmedArticle);

	if (abysResponse instanceof Error) {
		return {
			reference,
			error: new TechnicalError(
				"Wrong response when send doccument to abys.",
				{
					error: abysResponse,
				},
			),
		};
	}

	return { reference };
}

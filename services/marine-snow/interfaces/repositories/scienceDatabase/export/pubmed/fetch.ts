import { PubMedAPI } from "@interfaces/providers/scienceDatabase/pubmed";
import { TechnicalError } from "@vendors/clean";

const expectHttpCode = 200;

export async function fetchPubmedArticle(references: string[]) {
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

	if (!pubmedResponse.body.PubmedArticleSet.PubmedArticle) {
		return new TechnicalError("Missing PubmedArticle key.");
	}

	return pubmedResponse.body.PubmedArticleSet.PubmedArticle;
}

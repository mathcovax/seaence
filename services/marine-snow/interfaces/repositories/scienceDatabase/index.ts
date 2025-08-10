import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { PubMedAPI } from "@interfaces/providers/scienceDatabase/pubmed";
import { TechnicalError } from "@vendors/clean";
import { match } from "ts-pattern";
import { fetchPubmedArticleReferences } from "./fetch/pubmed";
import { exportArticleReferences } from "./export";

scienceDatabaseRepository.default = {
	save() {
		throw new TechnicalError("Unsupport method.");
	},
	articleReferenceValueExist(provider, value) {
		return match(provider.value)
			.with(
				"pubmed",
				() => PubMedAPI.articleExist(value.value),
			)
			.exhaustive();
	},
	fetchPubmedArticleReferences,
	exportArticleReferences,
};

import { type ScienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { type ArticleType } from "@business/domains/common/articleType";
import { ArticleReference } from "@business/domains/entities/articleReference";
import { PubMedAPI } from "@interfaces/providers/scienceDatabase/pubmed";
import { articleTypeToFilterArticleType } from "@interfaces/providers/scienceDatabase/pubmed/types/utils";
import { dateYYYYMMDDObjecter, intObjecter, RepositoryError, type DateYYYYMMDDInterval } from "@vendors/clean";

const dateAdvancement = 1;
const maxPageIteration = 1000;
const expectHttpCode = 200;

export async function *fetchPubmedArticleReferences(
	articleType: ArticleType,
	interval: DateYYYYMMDDInterval,
): ReturnType<ScienceDatabaseRepository["fetchPubmedArticleReferences"]> {
	const from = interval.value.from;
	const to = interval.value.to;

	for (
		let currentDate = new Date(from);
		currentDate.getTime() <= to.getTime();
		currentDate.setDate(currentDate.getDate() + dateAdvancement)
	) {
		for (let page = 0; page <= maxPageIteration; page++) {
			const base = {
				date: dateYYYYMMDDObjecter.unsafeCreate(currentDate),
				page: intObjecter.unsafeCreate(page),
			};

			if (page === maxPageIteration) {
				yield {
					...base,
					success: false,
					error: new RepositoryError("Misson exceed page limit"),
					references: undefined,
				};
				return;
			}

			const response = await PubMedAPI.getSearchResult(
				page,
				currentDate,
				articleTypeToFilterArticleType[articleType.value],
			);

			if (response instanceof Error || response.code !== expectHttpCode) {
				yield {
					...base,
					success: false,
					error: new RepositoryError("Pubmed unexpected response"),
					references: undefined,
				};
				return;
			}

			if (!response.body.esearchresult.idlist.length) {
				break;
			}

			yield {
				...base,
				success: true,
				error: undefined,
				references: response.body.esearchresult.idlist.map(
					(value) => ArticleReference.valueObjecter.unsafeCreate(value),
				),
			};
		}
	}
}

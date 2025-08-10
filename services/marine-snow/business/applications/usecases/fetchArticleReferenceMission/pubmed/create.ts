import { fetchArticleReferenceMissionRepository } from "@business/applications/repositories/fetchArticleReferenceMission";
import { type ArticleType } from "@business/domains/common/articleType";
import { PubmedFetchArticleReferenceMissionEntity } from "@business/domains/entities/fetchArticleReferenceMission/pubmed";
import { type DateYYYYMMDDInterval, UsecaseHandler } from "@vendors/clean";

interface Input {
	interval: DateYYYYMMDDInterval;
	articleType: ArticleType;
}

export class CreateFetchPubmedArticleReferenceMissionUsecase extends UsecaseHandler.create({
	fetchArticleReferenceMissionRepository,
}) {
	public execute({ interval, articleType }: Input) {
		return this
			.fetchArticleReferenceMissionRepository
			.save(
				PubmedFetchArticleReferenceMissionEntity.create({
					id: this
						.fetchArticleReferenceMissionRepository
						.generateId(),
					articleType,
					interval,
				}),
			);
	}
}

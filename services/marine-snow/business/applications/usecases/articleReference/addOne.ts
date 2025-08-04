import { articleReferenceRepository } from "@business/applications/repositories/articleReference";
import { scienceDatabaseRepository } from "@business/applications/repositories/scienceDatabase";
import { type Provider } from "@business/domains/common/provider";
import { type ArticleReference, ArticleReferenceEntity } from "@business/domains/entities/articleReference";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input {
	provider: Provider;
	referenceValue: ArticleReference.Value;
}

export class AddOneArticleReferenceUsecase extends UsecaseHandler.create({
	scienceDatabaseRepository,
	articleReferenceRepository,
}) {
	public async execute({ provider, referenceValue }: Input) {
		const referenceExist = await this.scienceDatabaseRepository
			.articleReferenceValueExist(provider, referenceValue);

		if (!referenceExist) {
			return new UsecaseError(
				"search-result-reference-is-not-valid",
				{
					provider,
					referenceValue,
				},
			);
		}

		const articleReference = ArticleReferenceEntity.create({
			provider,
			value: referenceValue,
		});

		return this.articleReferenceRepository.save(articleReference);
	}
}

import { articleReferenceRepository } from "@business/applications/repositories/articleReference";
import { type Provider } from "@business/domains/common/provider";
import { type ArticleReference } from "@business/domains/entities/articleReference";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	provider: Provider;
	referenceValue: ArticleReference.Value;
}

export class FindOneArticleReferenceUsecase extends UsecaseHandler.create({
	articleReferenceRepository,
}) {
	public execute({ provider, referenceValue }: Input) {
		return this.articleReferenceRepository.findOne(
			provider,
			referenceValue,
		);
	}
}

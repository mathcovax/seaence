import { EntityHandler, intObjecter, type GetEntityProperties } from "@vendors/clean";
import { ExportArticleReferenceMission, ExportArticleReferenceMissionEntity } from ".";
import { articleReferenceObjecter } from "@business/domains/common/articleReference";
import { type ArticleReferenceEntity } from "../articleReference";

export namespace ExportManyArticleReferenceMission {

}

type ExportManyArticleReferenceMissionEntityCreateParams = Pick<
	GetEntityProperties<typeof ExportManyArticleReferenceMissionEntity>,
	| "id"
	| "concurrency"
>;

const defaultQuantityProcessed = 0;

export class ExportManyArticleReferenceMissionEntity extends EntityHandler.create(
	{
		concurrency: intObjecter,
		quantityProcessed: intObjecter,
		failedArticleReference: articleReferenceObjecter.array().nullable(),
	},
	ExportArticleReferenceMissionEntity,
) {
	public static create(params: ExportManyArticleReferenceMissionEntityCreateParams) {
		return new ExportManyArticleReferenceMissionEntity({
			...params,
			quantityProcessed: intObjecter.unsafeCreate(defaultQuantityProcessed),
			failedArticleReference: null,
			status: ExportArticleReferenceMission
				.statusObjecter
				.unsafeCreate("inProgress"),
		});
	}

	public failed(failedArticleReference: ArticleReferenceEntity[]) {
		return super
			.failed()
			.update({
				failedArticleReference: failedArticleReference.map(
					articleReferenceObjecter.unsafeCreate,
				),
			});
	}

	public processArticleReferences(failedArticleReference: ArticleReferenceEntity[]) {
		return this.update({
			quantityProcessed: intObjecter.unsafeCreate(
				this.quantityProcessed.value + failedArticleReference.length,
			),
		});
	}
}

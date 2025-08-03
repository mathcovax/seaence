import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { ExportArticleReferenceMission, ExportArticleReferenceMissionEntity } from ".";
import { ArticleReference } from "../articleReference";
import { providerObjecter } from "@business/domains/common/provider";

export namespace ExportOneArticleReferenceMission {

}

type ExportOneArticleReferenceMissionEntityCreateParams = Pick<
	GetEntityProperties<typeof ExportOneArticleReferenceMissionEntity>,
	| "id"
	| "provider"
	| "referenceValue"
>;

export class ExportOneArticleReferenceMissionEntity extends EntityHandler.create(
	{
		provider: providerObjecter,
		referenceValue: ArticleReference.valueObjecter,
	},
	ExportArticleReferenceMissionEntity,
) {
	public static create(params: ExportOneArticleReferenceMissionEntityCreateParams) {
		return new ExportOneArticleReferenceMissionEntity({
			...params,
			status: ExportArticleReferenceMission
				.statusObjecter
				.unsafeCreate("inProgress"),
		});
	}
}

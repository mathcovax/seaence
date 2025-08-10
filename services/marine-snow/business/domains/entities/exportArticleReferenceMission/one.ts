import { createEntityKind, EntityHandler, type GetEntityProperties } from "@vendors/clean";
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

const {
	kind,
	kindValue,
} = createEntityKind("exportOneArticleReferenceMissionEntity");

export class ExportOneArticleReferenceMissionEntity extends EntityHandler.create(
	{
		kind,
		provider: providerObjecter,
		referenceValue: ArticleReference.valueObjecter,
	},
	ExportArticleReferenceMissionEntity,
) {
	public static create(params: ExportOneArticleReferenceMissionEntityCreateParams) {
		return new ExportOneArticleReferenceMissionEntity({
			...params,
			kind: kindValue,
			status: ExportArticleReferenceMission
				.statusObjecter
				.unsafeCreate("inProgress"),
		});
	}
}

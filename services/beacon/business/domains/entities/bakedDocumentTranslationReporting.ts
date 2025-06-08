import { EntityHandler, type GetEntityProperties } from "@vendors/clean";
import { ReportingEntity } from "./reporting";
import { bakedDocumentIdObjecter } from "../common/bakedDocument";
import { userIdObjecter } from "../common/user";

export class BakedDocumentTranslationReportingEntity extends EntityHandler.create(
	{
		bakedDocumentId: bakedDocumentIdObjecter,
		userId: userIdObjecter,
	},
	ReportingEntity,
) {
	public static create(params: GetEntityProperties<typeof BakedDocumentTranslationReportingEntity>) {
		return new BakedDocumentTranslationReportingEntity(params);
	}
}

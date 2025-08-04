import { zod, createEnum, type GetValueObject, EntityHandler } from "@vendors/clean";

export namespace ExportArticleReferenceMission {
	export const idObjecter = zod
		.string()
		.createValueObjecter("exportArticleReferenceMissionId");

	export type Id = GetValueObject<typeof idObjecter>;

	export const statusEnum = createEnum([
		"inProgress",
		"failed",
		"success",
	]);

	export const statusObjecter = zod
		.enum(statusEnum.toTuple())
		.createValueObjecter("exportArticleReferenceMissionStatus");

	export type Status = GetValueObject<typeof statusObjecter>;
}

export class ExportArticleReferenceMissionEntity extends EntityHandler.create({
	id: ExportArticleReferenceMission.idObjecter,
	status: ExportArticleReferenceMission.statusObjecter,
}) {
	public failed(..._args: never[]) {
		return this.update({
			status: ExportArticleReferenceMission
				.statusObjecter
				.unsafeCreate("failed"),
		});
	}

	public success() {
		return this.update({
			status: ExportArticleReferenceMission
				.statusObjecter
				.unsafeCreate("success"),
		});
	}
}

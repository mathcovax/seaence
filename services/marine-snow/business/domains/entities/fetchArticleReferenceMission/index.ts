import { zod, createEnum, type GetValueObject, EntityHandler } from "@vendors/clean";

export namespace FetchArticleReferenceMission {
	export const idObjecter = zod
		.string()
		.createValueObjecter("fetchArticleReferenceMissionId");

	export type Id = GetValueObject<typeof idObjecter>;

	export const statusEnum = createEnum([
		"created",
		"inProgress",
		"failed",
		"success",
		"inRecovery",
	]);

	export const statusObjecter = zod
		.enum(statusEnum.toTuple())
		.createValueObjecter("fetchArticleReferenceMissionStatus");

	export type Status = GetValueObject<typeof statusObjecter>;
}

export class FetchArticleReferenceMissionEntity extends EntityHandler.create({
	id: FetchArticleReferenceMission.idObjecter,
	status: FetchArticleReferenceMission.statusObjecter,
}) {
	public start() {
		return this.update({
			status: FetchArticleReferenceMission
				.statusObjecter
				.unsafeCreate("inProgress"),
		});
	}

	public failed() {
		return this.update({
			status: FetchArticleReferenceMission
				.statusObjecter
				.unsafeCreate("failed"),
		});
	}

	public success() {
		return this.update({
			status: FetchArticleReferenceMission
				.statusObjecter
				.unsafeCreate("success"),
		});
	}

	public recovery() {
		return this.update({
			status: FetchArticleReferenceMission
				.statusObjecter
				.unsafeCreate("inRecovery"),
		});
	}
}

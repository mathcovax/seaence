import { type WarningEntity, type WarningId } from "@business/domains/entities/warning";
import { type PostWarningEntity } from "@business/domains/entities/warning/postWarning";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type Warning =
	| WarningEntity
	| PostWarningEntity;

export interface WarningRepository extends RepositoryBase<Warning> {
	generateWarningId(): WarningId;
}

export const warningRepository = createRepositoryHandler<WarningRepository>();

import { type BaseUserWarningId } from "@business/domains/entities/warning/base";
import { type PostUserWarningEntity } from "@business/domains/entities/warning/post";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type Warning =
	| PostUserWarningEntity;

export interface UserWarningRepository extends RepositoryBase<Warning> {
	generateUserWarningId(): BaseUserWarningId;
}

export const userWarningRepository = createRepositoryHandler<UserWarningRepository>();

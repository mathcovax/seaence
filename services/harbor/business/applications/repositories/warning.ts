import { type AnswerUserWarningEntity } from "@business/domains/entities/warning/answer";
import { type UserWarningId } from "@business/domains/entities/warning/base";
import { type PostUserWarningEntity } from "@business/domains/entities/warning/post";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export type Warning =
	| PostUserWarningEntity
	| AnswerUserWarningEntity;

export interface UserWarningRepository extends RepositoryBase<Warning> {
	generateUserWarningId(): UserWarningId;
}

export const userWarningRepository = createRepositoryHandler<UserWarningRepository>();

import { type PostEntity } from "@business/domains/entities/post";
import { type WarningMakeUserBan, type WarningReason } from "@business/domains/common/warning";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

interface InputWarning {
	makeUserBan: WarningMakeUserBan;
	reason: WarningReason;
}

interface InputPostWarning extends InputWarning {
	post: PostEntity;
}

export type Warning =
	| InputPostWarning;

export interface WarningRepository extends RepositoryBase {
	createPostWarning(warning: Warning): Promise<void>;
}

export const warningRepository = createRepositoryHandler<
	WarningRepository
>();

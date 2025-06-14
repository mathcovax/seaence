import { type PostId } from "@business/domains/entities/post";
import { type UserId } from "@business/domains/entities/user";
import { type WarningMakeUserBan, type WarningReason } from "@business/domains/entities/warning";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

interface InputWarning {
	makeUserBan: WarningMakeUserBan;
	reason: WarningReason;
	contentCreatorId: UserId;
}

interface InputPostWarning extends InputWarning {
	postId: PostId;
}

export type Warning =
	| InputPostWarning;

export interface WarningRepository extends RepositoryBase {
	createWarning(warning: Warning): Promise<unknown>;
}

export const warningRepository = createRepositoryHandler<
	WarningRepository
>();

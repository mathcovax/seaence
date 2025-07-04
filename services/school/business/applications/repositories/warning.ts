import { type PostEntity } from "@business/domains/entities/post";
import { type WarningMakeUserBan, type WarningReason } from "@business/domains/common/warning";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";
import { type AnswerEntity } from "@business/domains/entities/answer";

interface InputWarning {
	makeUserBan: WarningMakeUserBan;
	reason: WarningReason;
}

interface InputPostWarning extends InputWarning {
	post: PostEntity;
}

interface InputAnswerWarning extends InputWarning {
	answer: AnswerEntity;
	post: PostEntity;
}

export interface WarningRepository extends RepositoryBase {
	createPostWarning(warning: InputPostWarning): Promise<void>;
	createAnswerWarning(warning: InputAnswerWarning): Promise<void>;
}

export const warningRepository = createRepositoryHandler<
	WarningRepository
>();
